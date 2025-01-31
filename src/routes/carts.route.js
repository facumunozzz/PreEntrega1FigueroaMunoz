import { Router } from "express";

const route = Router()

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', precio: 300 },
];

const generarId = () => {
    const ultimoProducto = productos[productos.length - 1];
    return ultimoProducto ? ultimoProducto.id + 1 : 1; // Genera un nuevo ID
};

route.post('/', (req, res) => {
    const { title, description, code, price } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ mensaje: 'Falta información' });
    }

    const nuevoProducto = {
        id: generarId(),
        products: []
    };

    res.status(201).json({ mensaje: 'Producto agregado correctamente', producto: nuevoProducto });
});

route.get('/:cid', (req, res) => {
    const { cid } = req.params;
    
    const carrito = productos.find(c => c.id === parseInt(cid));

    if (!carrito) {
        return res.status(404).json({ mensaje: 'producto no encontrado' });
    }

    res.json({ products: carrito.products });
});

route.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;

    const carrito = productos.find(c => c.id === parseInt(cid));
    if (!carrito) {
        return res.status(404).json({ mensaje: 'producto no encontrado' });
    }

    const producto = productos.find(p => p.id === parseInt(pid));
    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Agregar el ID del producto al carrito
    carrito.products.push({ product: parseInt(pid) });

    res.status(201).json({ mensaje: 'Producto agregado correctamente al carrito', carrito });
});


export default route;