const {Router} = require("express")
const {Types} = require('mongoose')
let ObjectId = Types.ObjectId
const Product = require("./../models/productModel")
const router = new Router()
const {isAdmin, isAuth} = require('../util')

// router.get('/create', async(req, res) => {
//     try{
//         const product = new Product({
//             name: 'Dress',
//             category: ObjectId('5f1c5a8f04036b2c30e66ea5'),
//             imageUrl: '../images/dress1.jpg',
//             brand: 'Zara',
//             description:'High quality fabric',
//             price: 222.2,
//             countInStock: 20,
//             sizes : ['XS', 'S', 'M']
//         })
//         const newProduct = await product.save()
//         res.json(newProduct)
//     }catch (e) {
//         res.json({message: e.message})
//     }
// })

router.get('/', async (req,res) => {
    const category = req.query.category ? req.query.category : '';
    const searchKeyword = req.query.searchKeyword
        ? {
            name: {
                $regex: req.query.searchKeyword,
                $options: 'i',
            },
        }
        : {};
    const sizes = req.query.sizes ? req.query.sizes.split('-') : ''
    const colors = req.query.colors ? req.query.colors.split('-') : ''
    const minPrice = req.query.minprice ? +req.query.minprice : ''
    const maxPrice = req.query.maxprice ? +req.query.maxprice : ''
    const sortOrder = req.query.sortOrder
        ? req.query.sortOrder === 'lowest'
            ? { price: 1 }
            : { price: -1 }
        : { _id: -1 };
    const products = await Product.find({ ...searchKeyword, isActive: true }).populate('category').sort(
        sortOrder
    );
    const categoryProducts = category ? products.filter(product => product.category.name.toLowerCase() === category) : products
    const colorsProducts = colors.length ? categoryProducts.filter(product => colors.includes(product.color)) : categoryProducts
    const priceProducts = (minPrice && maxPrice) ?  colorsProducts.filter(product => product.price > minPrice && product.price < maxPrice) : colorsProducts
    const sizesProducts = sizes.length ? priceProducts.filter(product => {
       for(let size of product.sizes){
           if(sizes.includes(size.toLowerCase())){
               return true
               break;
           }
       }
        }) : priceProducts
    res.json(sizesProducts);
})

router.get('/colors', async (req, res) => {
    const products = await Product.find({isActive: true})
    if(products){
        const colors = [...new Set(products.map(product => product.color))]
        res.json(colors)
    }else{
        res.status(404).json({message: 'Products not found'})
    }
})

router.get('/sizes', async (req, res) => {
    const products = await Product.find({isActive: true})
    if(products){
        const sizes = []
        products.forEach(product => product.sizes.forEach(size => {if(!sizes.includes(size) && size !== ''){sizes.push(size)}}))
        res.json(sizes)
    }else{
        res.status(404).json({message: 'Products not found'})
    }
})

router.get('/all', isAuth, isAdmin, async (req,res) => {
    const category = req.query.category ?  req.query.category  : '';
    const searchKeyword = req.query.searchKeyword
        ? {
            name: {
                $regex: req.query.searchKeyword,
                $options: 'i',
            },
        }
        : {};
    const sortOrder = req.query.sortOrder
        ? req.query.sortOrder === 'lowest'
            ? { price: 1 }
            : { price: -1 }
        : { _id: -1 };
    const products = await Product.find({  ...searchKeyword }).populate('category').sort(
        sortOrder
    );
    const categoryProducts = category ? products.filter(product => product.category.name.toLowerCase() === category) : products
    res.json(categoryProducts);
})

router.post('/:id/reviews', isAuth, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const review = {
            name: req.body.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((a, c) => c.rating + a, 0) /
            product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).json({
            data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            message: 'Review saved successfully.',
        });
    } else {
        res.status(404).json({ message: 'Product Not Found' });
    }
});

router.get('/:id', async (req,res) => {
    const product = await Product.findOne({_id: req.params.id}).populate('category')
    if(product) {
        return res.json(product)
    }else {
        res.status(404).json({message: 'Product not found'})
    }

})

router.post('/',  isAuth, isAdmin, async (req,res) => {
    const product = new Product({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        sizes: req.body.sizes,
        color: req.body.color,
        category: req.body.category,
        brand: req.body.brand,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        isActive: req.body.isActive
    })
    const newProduct = await product.save()
    if(newProduct){
        return res.status(201).json({message: 'Product was created', data: newProduct})
    }
    res.status(500).json({message: 'Something went wrong. Error in creating product'})
})

router.put('/:id', isAuth, isAdmin, async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        product.name= req.body.name
        product.imageUrl= req.body.imageUrl
        product.category= req.body.category
        product.brand= req.body.brand
        product.description= req.body.description
        product.price= req.body.price
        product.countInStock= req.body.countInStock
        product.isActive = req.body.isActive
        product.sizes = req.body.sizes
        product.color = req.body.color
        const updatedProduct = await product.save()
        if(updatedProduct){
            return res.status(200).json({message: 'Product was updated', data: updatedProduct})
        }
    }
    res.status(500).json({message: 'Something went wrong. Error in updating product'})

})

router.delete('/:id', isAuth, isAdmin, async (req,res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.json({ message: 'Product Deleted' });
    } else {
        res.status(404).json('Error in Deletion.');
    }

})




module.exports = router
