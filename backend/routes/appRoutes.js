module.exports = app => {
    const passwordHash = require("password-hash")
    const jwt = require("jsonwebtoken");
    const key = require("../config/key.json");

    const Sequelize = require("sequelize");
    const Op = Sequelize.Op

    const users = require("../models").Users;

    const Expenses = require("../controllers/expenseController")
    const Invites = require("../controllers/inviteController")

    app.get("/", (req, res) => {
        res.send("Working Fine!!");
    });

    app.post("/signup", (req, res) => {
        let data = req.body.password;
        let hash = passwordHash.generate(data);
        users.create({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            google: false
        });
        res.send("create Success")
    })

    app.post("/login", (req, res) => {
        let data = req.body;
        users
            .findAll({
                attributes: ["id", "email", "password"],
                where: { email: data.email }
            })
            .then(prom => {
                let val = passwordHash.verify(data.password, prom[0].password);
                let token;
                if (val) {
                    token = {
                        id: jwt.sign(
                            {
                                exp: Date.now() / 1000 + 60 * 60,
                                id: prom[0].id
                            },
                            key.tokenKey
                        ),
                        validity: true,
                        uid: prom[0].id
                    };
                } else {
                    token = {
                        id: jwt.sign({ id: prom[0].id }, key.tokenKey),
                        validity: false,
                    };
                }
                res.send(token);
            });
    })

    app.post("/googleLogin", async (req, res) => {
        console.log("GOOGLE LOGIN", req.body)
        // let uid = uuid()
        let uid = Math.floor(Math.random() * 100)
        let resp = await users.create({
            id: uid,
            email: req.body.email,
            password: req.body.token,
            role: false,
            google: true,
        });

        let token = {
            id: jwt.sign(
                {
                    exp: Date.now() / 1000 + 60 * 60,
                    id: uid
                },
                key.tokenKey
            ),
            validity: true,
            google: true,
            uid: uid
        };

        console.log("GOOGLE LOGIN", token)
        res.send(token)
    })

    app.get("/users", async (req, res) => {
        users.findAll().then(resp => res.send(resp))
    })

    app.post("/expense", async (req, res) => {
        let resp = await Expenses.addExpense(req.body)
        res.send(resp)
    })

    app.get("/expense", async (req, res) => {
        Expenses.getExpense().then(resp => res.send(resp))
    })

    app.post("/invite", async (req, res) => {
        let resp = await Invites.addInvite(req.body)
        res.send(resp)
    })

    app.post("/invites", async (req, res) => {
        console.log(req.body)
        let resp = await Invites.getInvite(req.body.uid, req.body.eid)
        res.send(resp)
    })
}