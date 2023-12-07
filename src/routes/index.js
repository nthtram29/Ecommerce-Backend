
const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')
const PaymentRouter = require('./PaymentRouter')
const PostsRouter = require('./PostsRouter')

const routes = (app) =>{
    app.use('/api/user', UserRouter),
    app.use('/api/product', ProductRouter)
    app.use('/api/order', OrderRouter)
    app.use('/api/payment', PaymentRouter)
    app.use('/api/posts', PostsRouter)
  
    
}

module.exports = routes