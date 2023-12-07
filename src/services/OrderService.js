const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
// const EmailService = require("../services/EmailService")
const Email = require("../services/EmailService")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems,paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone,user, isPaid, paidAt,email } = newOrder
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                    _id: order.product,
                    countInStock: {$gte: order.amount}
                    },
                    {$inc: {
                        countInStock: -order.amount,
                        selled: +order.amount
                    }},
                    {new: true}
                )
                if(productData) {
                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    }
                }
                 else {
                    return{
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if(newData.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${arrId.join(',')} khong du hang`
                })
            } else {
                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                         phone
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                    isPaid, paidAt
                })
                if (createdOrder) {
                    // await EmailService.sendEmailCreateOrder(email,orderItems)
                    await Email.sendEmailCreateOrder(email, orderItems )
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS'
                    })
                }
            }
        } catch (e) {
        
            reject(e)
        }
    })
}

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({createdAt: -1, updatedAt: -1})
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
           
            reject(e)
        }
    })
}

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            
            reject(e)
        }
    })
}

const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                    _id: order.product,
                    selled: {$gte: order.amount}
                    },
                    {$inc: {
                        countInStock: +order.amount,
                        selled: -order.amount,
                    }},
                    {new: true}
                )
                if(productData) {
                    order = await Order.findByIdAndDelete(id)
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return{
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results[0] && results[0].id
            
            if(newData) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${newData} khong ton tai`
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({createdAt: -1, updatedAt: -1})
            // const allOrder = await Order.aggregate([
            //     {
            //         $project: {
            //            dayMonthYear: { $dateToString: { format: "%d/%m/%Y", date: "$paidAt" } }
            //         }
            //      }
            // ])
            
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getRevenueByCustomers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.aggregate([
                { $match: { isPaid: true } },
                { $group: { _id: '$shippingAddress', total: { $sum: '$totalPrice' }  } },
              ])
              
              resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allOrder
            })  
            
        } catch (e) {
            reject(e)
        }
    })
}
const getRevenue = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.aggregate([
                { $match: { isPaid: true } },
                // { $group: { _id: '$orderItems', total: { $sum: '$totalPrice' }  } }
                { $group: { _id: null, totalAmount: { $sum: "$totalPrice" } } }
              ])
              
              resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allOrder
            })  
            
        } catch (e) {
            reject(e)
        }
    })
}




module.exports = {
    createOrder,
    getOrderDetails,
    getAllOrderDetails,
    cancelOrderDetails,
    getAllOrder,
    getRevenueByCustomers,
    getRevenue
}