module.exports = mongoose => {
    const Item = mongoose.model(
        "item",
        mongoose.Schema(
            {
                name: String,
                description: String,
                price: Number,
                category: String
            },
            { timestamps: true }
        )
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
    const Item = mongoose.model("item", schema)

    return Item;
}