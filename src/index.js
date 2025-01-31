import express from 'express'
import ProductsRoute from './routes/products.route'
import CartsRoute from './routes/carts.route'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use('/products/', ProductsRoute)
app.use('/carts', CartsRoute)


app.listen(8080, ()=>{
    console.log('servidor on en puerto 8080')
})