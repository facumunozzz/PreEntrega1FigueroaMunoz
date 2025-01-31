import { Router } from "express";

const route = Router()

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', precio: 300 },
];

route.get('/', (req, res) => {
    const { limit } = req.query;
    
    const productosLimitados = limit ? productos.slice(0, limit) : productos;

    res.json({ productos: productosLimitados });
});

route.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const producto = productos.find(p => p.id === parseInt(pid));

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ producto });
});


const generarId = () => {
    const ultimoProducto = productos[productos.length - 1];
    return ultimoProducto ? ultimoProducto.id + 1 : 1; // Genera un nuevo ID
};

route.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category} = req.body;

    if (!title || !description || !code || !price || !stock || !category || !status) {
        return res.status(400).json({ mensaje: 'Falta información' });
    }

    const nuevoProducto = {
        id: generarId(),
        title: "Fideos",
        description: "Fideos Molto",
        code: "abc",
        price: 200,
        status: true,
        stock: 90,
        category: "Pastas"
    };

    res.status(201).json({ mensaje: 'Producto agregado correctamente', producto: nuevoProducto });
});

route.post('/', (req, res) => {
    const producto = req.body
    console.log(producto)
    res.json({mensaje: 'se creo el producto correctamente'})
})

route.put('/:id', (req, res) => {
    const productoActualizado = req.body
    const id = req.params.id
    if(!id) {
        return res.status(404).json ({mensaje: 'no pasaste el id'})
    }

    console.log(productoActualizado)

    const productoEncontrado = bbdd.find(alumno => alumno.id === id)
    if (!productoEncontrado){
        return res.status(404).json ({mensaje: 'alumno no encontrado'})
    }

    const producto = {
        ...alumnoEncontrado,
        ...alumnoActualizado
    }

    console.log(producto)

    res.json({mensaje: 'body recibido'})
})

route.delete('/:pid', (req, res) =>{
    const id = req.params.id
    res.status(200).json({mensaje: 'se elimino un producto'})
})




export default route;