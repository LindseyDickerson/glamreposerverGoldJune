const router = require('express').Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user');
const Glam = require('../db').import('../models/glam');
const validateSession = require('../middleware/validate-session')

router.get('/getall', (req, res) => {
    Glam.findAll()
    .then(glam => res.status(200).json(glam))
    .catch(err => res.status(500).json({ error: err}))
})
    router.post('/create', validateSession, (req, res) => {
        if (!req.errors) {
            const glamFromRequest = {
                glamBrand: req.body.glamBrand,
                glamName: req.body.glamName,
                glamCat: req.body.glamCat,
                glamBuyLoc: req.body.glamBuyLoc,
                glamBuyPrice: req.body.glamBuyPrice,
                glamLinkPic: req.body.glamLinkPic,
                glamComments: req.body.glamComments
            }
            Glam.create(glamFromRequest)
            .then(glam => res.status(200).json(glam))
            .catch(err => res.json(req.errors))
        } else {
            res.status(500).json(req.errors)
        }
    })

    router.get('/:id', (req, res) => {
        Glam.findOne({ where: { id: req.params.id }})
        .then(glam => res.status(200).json(glam))
        .catch(err => res.status(500).json({ error: err}))
    })

    router.put('/:id', validateSession, (req, res) => {
        if (!req.errors) {
            Glam.update(req.body, { where: { id: req.params.id }})
            .then(glam => res.status(200).json(glam))
            .catch(err => res.json(req.errors))
        } else {
            res.status(500).json(req.errors)
        }
    })

    router.delete('/:id', validateSession, (req, res) => {
        if (!req.errors) {
            Glam.destroy({ where: { id: req.params.id }})
            .then(glam => res.status(200).json(glam))
            .catch(err => res.json(req.errors))
        } else {
            res.status(500).json(req.errors)
        }
    })

    // router.put('/update/:id', validateSession, (req, res) => {
    //     if (!req.errors) {
    //         Glam.update({ where: { id: req.params.id }})
    //         .then(glam => res.status(200).json(glam))
    //         .catch(err => res.json(req.errors))
    //     } else {
    //         res.status(500).json(req.errors)
    //     }
    // })

    module.exports = router;