const Product = require("../models/product")
const { validateProduct } = require("../validator")

exports.createProduct = async(req, res)=>{
    const { error } = validateProduct(req.body)
    if (error) {
        res.json(error.details[0].message)
    }
    try {
        const product = new Product({
            category: req.body.category,
            name: req.body.name,
            img: req.file.path,
            price: req.body.price,
            featured: req.body.featured,
            topSelling: req.body.topSelling,
        });

        const productItem = await product.save()

        res.setHeader("Content-Type", "application/json")
        res.json(productItem)
    } catch (error) {
        res.json({message: error.message})
    }
}

exports.getProduct = async(req,res)=>{
    try {
        let allProduct = await Product.find().populate("category")
        res.json(allProduct)  
    } catch (error) {
        console.log(error);
    }
}