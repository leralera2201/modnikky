import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteOrder, listOrders} from "../actions/orderActions";

const AdminOrdersPage = () => {

    // const [sortOrder, setSortOrder] = useState('')
    // const [searchKeyword, setSearchKeyword] = useState('')
    // const categoryMatch = props.match.params.id ? props.match.params.id : ''

    const orderList = useSelector(state => state.orderList)
    const {orders, loading, error} = orderList

    const dispatch = useDispatch()
    const orderDelete = useSelector(state => state.orderDelete);
    const {success: successDelete} = orderDelete;

    useEffect(() => {
        dispatch(listOrders())
    }, [successDelete])// eslint-disable-line react-hooks/exhaustive-deps

    const deleteHandler = (orderId) => {
        dispatch(deleteOrder(orderId))
    }

    const style = orders && orders.length ? {overflowX:'auto'} : {}
    return (
        <div className="pt120 admin-container">
            <div className="table " style={style}>
                {loading ? <div className="flex">
                        <div className="lds-ring">
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div> :
                    error ?
                        <div className="sign-in-error">{error}</div>
                        :
                        orders.length ?
                            <table id="table" >
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th className="order-product-th">Products</th>
                                    <th>Shipping</th>
                                    <th>Payment</th>
                                    <th>User</th>
                                    <th>Total</th>
                                    <th>isPaid</th>
                                    <th>Paid at</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>

                                <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order._id}>
                                        <td>{index+1}</td>
                                        <td>{order.orderItems && order.orderItems.map((item, index) => (
                                            <table key={index}>
                                                <tbody>
                                                <tr >
                                                    <td style={{width: 200}}>
                                                        {item.name}
                                                    </td>
                                                    <td>
                                                        {item.qty}
                                                    </td>
                                                    <td>
                                                        <img src={item.imageUrl} alt="" className="table-img"/>
                                                    </td>
                                                    <td className="order-product-td-min">
                                                        {item.price} UAH
                                                    </td>
                                                    <td className="order-product-td-min">
                                                        {item.size}
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>

                                        ))}</td>
                                        <td className="bigger-th">
                                            <div>
                                                {order.shipping.name} {order.shipping.surname},
                                            </div>
                                            <div>
                                                {order.shipping.city}, New Post {order.shipping.newPost},
                                            </div>
                                            <div>
                                                {order.shipping.phone}
                                            </div>
                                        </td>
                                        <td>{order.payment.paymentMethod}</td>
                                        <td>{order.user ? order.user.name : ''} {order.user ? order.user.surname : ''}</td>
                                        <td>{order.itemsPrice} UAH</td>
                                        <td>{order.isPaid.toString()}</td>
                                        <td className="bigger-th">
                                            {order.paidAt.slice(0,10)} {+(order.paidAt.slice(11, 13)) + 3}{order.paidAt.slice(13, 19)}
                                        </td>
                                        <td className="table-center">
                                            <button className="sign-in-btn table-btn" onClick={() => deleteHandler(order._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>

                                ))}
                                </tbody>
                            </table>
                            :
                            <div className="product__title" style={{textAlign: 'center'}}>There are no orders in database.</div>
                }

            </div>
        </div>
    )
}

export default AdminOrdersPage
