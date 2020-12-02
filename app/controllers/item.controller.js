const db = require("../models");
const Item = db.items;

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    });

    item
        .save(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while creating the Item, please try again."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.name;
    let condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Item.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "An error occurred while retrieving the Item, please try again."
            })
        })
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Item.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "No item found with id" + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving item " + id});
        });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Item cannot be blank."
        });
    }

    const id = req.params.id;

    Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot update item ${id}.`
                });
            } else res.send({ message: "Item updated."})
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating item " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id

    Item.findByAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot delete item ${id}.`
                });
            } else {
                res.send({
                    message: "Item successfully deleted."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete item " + id
            })
        })
};

exports.deleteAll = (req, res) => {
    Item.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Items were successfully deleted.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred. Please try again."
            })
        })
};

