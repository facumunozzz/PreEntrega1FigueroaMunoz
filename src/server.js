import express from "express";
import route from "./routes/products.route.js"
import handlebars from 'express-handlebars';
import path from 'path';
import {Server} from 'socket.io';
import routerRealTime from "./routes/realTimeProducts.route.js";

const app = express();


const serverHttp = app.listen(8080, () => console.log("server ok puerto 8080"));
const socketServer = new Server (serverHttp) 


app.engine('handlebars', handlebars.engine())
app.set('views', path.join(process.cwd(), "src", "views")) // ___dirname + '/views'
app.set('view engine', 'handlebars')
app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/productos', route)
app.use('/', routerRealTime)


socketServer.on('connection', (socket) => {
    console.log('nueva conexion', socket.id)
})