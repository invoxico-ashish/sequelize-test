const db = require("../models")
const { Sequelize, Op, QueryTypes } = require("sequelize")

const Users = db.users;
const Posts = db.post;
const Tags = db.tags
const addUser = async function (req, res) {
    try {
        // for create ------
        // let data = await Users.create({ name: " four", email: "test@gmail.com",gender:"male" })
        // console.log(data)

        // for update -----------
        // let data = await Users.update({ name: "update name" }, { where: { id: 2 } })

        // for delete
        // let data = await Users.destroy({where:{id:2}})

        //truncate
        // let data = await Users.destroy({ truncate: true })

        //bulkcreate
        // let data = await Users.bulkCreate([
        //     { name: "one", email: "one@gmail.com", gender: "male" },
        //     { name: "two", email: "two@gmail.com", gender: "male" },
        //     { name: "three", email: "three@gmail.com", gender: "male" },
        //     { name: "for", email: "for@gmail.com", gender: "male" },
        //     { name: "fv", email: "fv@gmail.com", gender: "male" },
        // ])

        //find
        // let data = await Users.findAll({});
        // let data = await Users.findOne({
        //     attributes: [
        //         ["name", "userName"],
        //         ["emaiil", "userEmail"],
        //         [Sequelize.fn("Count", Sequelize.col("emaiil")), "emailCount"]
        //     ]
        // }, { where: { id: 1 } })


        // let data = await Users.findOne({
        //     attributes: [
        //         ["name", "userName"],
        //         ["emaiil", "userEmail"],
        //         [Sequelize.fn("CONCAT", Sequelize.col("emaiil"),"test"), "emailCount"]
        //     ]
        // }, { where: { id: 1 } })

        // let data = await Users.findOne({
        //     attributes: {
        //         exclude: ["createdAt", "updatedAt"],
        //         include: [
        //             [Sequelize.fn("CONCAT", Sequelize.col("name"), "singh"), "fullname"]
        //         ]
        //     }
        // }, { where: { id: 1 } })


        // let data = await Users.findAll({
        //     where:
        //     {
        //         id: {
        //             [Op.gt]: 2
        //         },
        //         emaiil: {
        //             [Op.like]: "%@gmail.com"
        //         },
        //     },
        //     order: [
        //         ["name", "DESC"]
        //     ],
        //     limit: 2,
        //     offset: 1
        // })

        // let data = await Users.count({})


        // find functions

        let data = await Users.findAndCountAll({
            where: {
                emaiil: "test@gmail.com"
            }
        })


        let response = { data: data };
        res.send(response)
    } catch (error) {
        return res.send(error)
    }
}
const validationCon = async (req, res) => {
    try {
        let data = await Users.create({ name: "test", email: "tes@yahoo.com", gender: "male" })
        let response = { data: data };
        res.send(response);
    } catch (error) {
        const messages = {};
        error.errors.forEach((err) => {
            let message;
            switch (err.validatorKey) {
                case "not_unique": message = "duplicate Entry";
                    break;
                case "isIn": message = "gender not in male/female";
                    break;
            }
            messages[error.path] = message;
            res.send(messages);
        });
    };
};
const rowQuery = async (req, res) => {
    // const user = await db.sequelize.query(`Select * from users where gender =:gender`, {
    //     type: QueryTypes.SELECT,
    //     model: Users,  // optional
    //     mapToModel: true,   // optional
    //     raw: true,   //// optional
    //     replacements: { gender: "male " }
    // });
    // let respone = { data: user };
    // res.send(respone);

    // const user = await db.sequelize.query(`Select * from users where gender = ?`, {
    //     type: QueryTypes.SELECT,
    //     model: Users,  // optional
    //     mapToModel: true,   // optional
    //     raw: true,   //// optional
    //     replacements: ["male"]
    // });
    // let respone = { data: user };
    // res.send(respone);

    // const user = await db.sequelize.query(`Select * from users where gender = IN(:gender)`, {
    //     type: QueryTypes.SELECT,
    //     model: Users,  // optional
    //     mapToModel: true,   // optional
    //     raw: true,   //// optional
    //     replacements: { gender: ['male', 'female'] }
    // });
    // let respone = { data: user };
    // res.send(respone);

    // const user = await db.sequelize.query(`Select * from users where email LIKE :searchEmail`, {
    //     type: QueryTypes.SELECT,
    //     model: Users,  // optional
    //     mapToModel: true,   // optional
    //     raw: true,   //// optional
    //     replacements: { searchEmail: "%@yahoo.com" }
    // });
    // let respone = { data: user };
    // res.send(respone);

    const user = await db.sequelize.query(`Select * from users where gender = $gender`, {
        type: QueryTypes.SELECT,
        // model: Users,  // optional
        // mapToModel: true,   // optional
        // raw: true,   //// optional
        // replacements: { searchEmail: "%@yahoo.com" }
        bind: { gender: "male" }
    });
    let respone = { data: user };
    res.send(respone);
}
const onToOne = async (req, res) => {
    let data = await Users.findAll({
        attributes: ["name", "email"],
        includes: [{
            model: Posts,
            as: "postDetails",
            attributes: ["title", ["name", "PostName"]]
        }],
        where: { id: 4 }
    })
    res.send(data);
}
const belongsTo = async (req, res) => {
    let data = await Posts.findAll({
        attributes: ["content", "title"],
        include: [{
            model: Users,
            attributes: ["name", "email"]
        }]
    })
    res.send(data);
}
const oneToMany = async (req, res) => {
    let data = await Users.findAll({
        attributes: ["name", "email"],
        include: [{
            model: Posts,
            as: "postDetails",
            attributes: ["title", ["name", "PostDetails"], ["content", "postCont"]]
        }],
        where: { id: 4 }
    })
    res.json(data)
}
const ManyToMany = async (req, res) => {
    // ----------POST TO TAG---------------
    // let data = await Posts.findAll({
    //     attributes: ["title", "content"],
    //     include: [{
    //         model: Tags,
    //         attributes: ["name"]
    //     }],
    // });

    // ------------TAG TO POST------------------
    let data = await Tags.findAll({
        attributes: ["id", "name"],
        include: [{
            model: Posts,
            attributes: ["name", ["title", "postTitle"], "content", ["user_id", "userId"]]
        }],
    });
    res.json(data);
}
module.exports = {
    addUser, validationCon, rowQuery,
    onToOne, belongsTo, oneToMany, ManyToMany
}