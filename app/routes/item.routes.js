module.exports = app => {
    const items = require('../controllers/item.controller')

    const router = require('express').Router();

    router.post("/", items.create);

    router.get("/", items.findAll);

    router.get("/:id", items.findOne);

    router.put("/:id", items.update);

    router.delete("/", items.deleteAll);

    app.use('/api/items', router);
}