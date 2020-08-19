const {Router} = require("express")
const Order = require("./../models/orderModel")
const router = new Router()
const {isAdmin, isAuth} = require('../util')


router.get('/', isAuth, isAdmin, async (req,res) => {
    const orders = await Order.find({}).populate('user')
    res.json(orders)
})

router.get("/mine", isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

router.get('/:id',isAuth, async (req,res) => {
    const order = await Order.findOne({_id: req.params.id})
    if(order) {
        return res.json(order)
    }else {
        res.status(404).json({message: 'Order not found'})
    }

})

router.post('/',  isAuth,  async (req,res) => {
    const newOrder = new Order({
        itemsPrice: req.body.itemsPrice,
        shipping: req.body.shipping,
        payment: {
            paymentMethod: req.body.payment.paymentMethod,
            paymentResult: {
                payerID: req.body.paymentResult.payerID,
                orderID: req.body.paymentResult.orderID,
                paymentID: req.body.paymentResult.paymentID
            }
        },
        user: req.user._id,
        orderItems: req.body.orderItems,
        isPaid: true,
        paidAt: Date.now()
    })
    const newCreatedOrder = await newOrder.save()
    if(newCreatedOrder){
        return res.status(201).json({message: 'Order was created', data: newCreatedOrder})
    }
    res.status(500).json({message: 'Smth went wrong. Error in creating order'})
})

// router.put("/:id/pay", isAuth, async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//         order.isPaid = true;
//         order.paidAt = Date.now();
//         order.payment = {
//             paymentMethod: 'paypal',
//             paymentResult: {
//                 payerID: req.body.payerID,
//                 orderID: req.body.orderID,
//                 paymentID: req.body.paymentID
//             }
//         }
//         const updatedOrder = await order.save();
//         res.json({ message: 'Order Paid.', order: updatedOrder });
//     } else {
//         res.status(404).json({ message: 'Order not found.' })
//     }
// });

// router.put('/:id', isAuth, isAdmin, async (req,res) => {
//     const product = await Product.findById(req.params.id)
//     if(product){
//         product.name= req.body.name
//         product.imageUrl= req.body.imageUrl
//         product.category= req.body.category
//         product.brand= req.body.brand
//         product.description= req.body.description
//         product.price= req.body.price
//         product.countInStock= req.body.countInStock
//         const updatedProduct = await product.save()
//         if(updatedProduct){
//             return res.status(200).json({message: 'Product was updated', data: updatedProduct})
//         }
//     }
//     res.status(500).json({message: 'Smth went wrong. Error in updating product'})
//
// })

router.delete('/:id', isAuth, isAdmin, async (req,res) => {
    const deletedProduct = await Order.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.json({ message: 'Order Deleted' });
    } else {
        res.json('Error in Deletion.');
    }

})

module.exports = router
