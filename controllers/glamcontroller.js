const router = require('express').Router();
const Glam = require('../db').import('../models/glam');
const validateSession = require('../middleware/validate-session')

router.get('/', (req, res) => {
    Glam.FindAll()
    .then(glam => res.status(200).json(glam))
    .catch(err => res.status(500).json({ error: err}))
})
    router.post('/', validateSession, (req, res) => {
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

    router.get('/:name', (req, res) => {
        Glam.findOne({ where: { nameOfGlam: req.params.name }})
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

    module.exports = router;