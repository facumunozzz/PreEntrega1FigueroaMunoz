import express from 'express'
import route from './routes/products.route.js'
import CartsRoute from './routes/carts.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static(__dirname + '/public'))
app.use('/products/', route)
app.use('/carts', CartsRoute)


app.listen(8080, ()=>{
    console.log('servidor on en puerto 8080')
})