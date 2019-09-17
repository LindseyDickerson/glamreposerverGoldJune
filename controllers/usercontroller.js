require('dotenv').config();
const router = require ('express').Router();
const Glam = require ('../db').import('../models/glam');
var sequelize = require('../db');
var User = sequelize.import('../models/user');
const validateSession = require('../middleware/validate-session');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/createuser', function (req, res) {
    var username = req.body.user.username;
    var pass = req.body.user.passwordhash;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)
    }).then(
        function createSuccess(user) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );


});

router.post('/signin', function(req, res) {
    User.findOne( { where: { username: req.body.user.username } } ).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.passwordhash, user.passwordhash, function (err, matches ) {
                    if(matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "Authenticated",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "Unsuccessfully authenticated!"})
                    }
                });
            } else {
                res.status(500).send({ error: "Failed to authenticate." });
            }
        },
        function (err) {
            res.status(501).send({ error: "Sorry about your luck."})
        }
    );
});

module.exports = router;