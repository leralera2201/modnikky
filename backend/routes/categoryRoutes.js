const {Router} = require("express")
const Category = require("./../models/categoryModel")
const router = new Router()
const {isAdmin, isAuth} = require('../util')


router.get('/',  async (req,res) => {
    // const searchKeyword = req.query.searchKeyword
    //     ? {
    //         name: {
    //             $regex: req.query.searchKeyword,
    //             $options: 'i',
    //         },
    //     }
    //     : {};
    const categories = await Category.find({isActive: true})
    res.json(categories);
})

router.get('/all', isAuth, isAdmin, async (req,res) => {
    // const searchKeyword = req.query.searchKeyword
    //     ? {
    //         name: {
    //             $regex: req.query.searchKeyword,
    //             $options: 'i',
    //         },
    //     }
    //     : {};
    const categories = await Category.find({})
    res.json(categories);
})


// router.get('/:id', async (req,res) => {
//     const product = await Product.findOne({_id: req.params.id})
//     if(product) {
//         return res.json(product)
//     }else {
//         res.status(404).json({message: 'Product not found'})
//     }
//
// })

router.post('/',  isAuth, isAdmin, async (req,res) => {
    const oldCategory = await Category.find({name: req.body.name})
    if(oldCategory.length){
        res.status(409).json({message: 'Category already exist'})
    }else{
        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            isActive: req.body.isActive
        })
        const newCategory= await category.save()
        if(newCategory){
            return res.status(201).json({message: 'Category was created', data: newCategory})
        }
        res.status(500).json({message: 'Something went wrong. Error in creating category'})
    }

})

router.put('/:id', isAuth, isAdmin, async (req,res) => {
    const category = await Category.findById(req.params.id)
    if(category){
        category.name= req.body.name
        category.description= req.body.description
        category.isActive = req.body.isActive
        const updatedCategory = await category.save()
        if(updatedCategory){
            return res.status(200).json({message: 'Category was updated', data: updatedCategory})
        }
    }
    res.status(500).json({message: 'Something went wrong. Error in updating category'})

})

router.delete('/:id', isAuth, isAdmin, async (req,res) => {
    const deletedCategory = await Category.findById(req.params.id);
    if (deletedCategory) {
        await deletedCategory.remove();
        res.json({ message: 'Category Deleted' });
    } else {
        res.status(404).json('Error in Deletion.');
    }

})

// router.get('/createcategory', async (req, res) => {
//     try{
//         const category = new Category({
//             name: 'Trousers'
//         })
//
//         const newCategory = await category.save()
//         res.json(newCategory)
//     }catch (e) {
//         res.json({message: e.message})
//     }
//
// })

module.exports = router
