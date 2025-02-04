import { Router } from "express";

const CartsRoute = Router();

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', precio: 300 },
];

const carritos = []; 


const generarIdCarrito = () => {
    const ultimoCarrito = carritos[carritos.length - 1];
    return ultimoCarrito ? ultimoCarrito.id + 1 : 1;
};


CartsRoute.post('/', (req, res) => {
    const nuevoCarrito = {
        id: generarIdCarrito(),
        products: [] 
    };

    carritos.push(nuevoCarrito); 
    res.status(201).json({ mensaje: 'Carrito creado correctamente', carrito: nuevoCarrito });
});

CartsRoute.get('/:cid', (req, res) => {
    const { cid } = req.params;

    const carrito = carritos.find(c => c.id === parseInt(cid));

    if (!carrito) {
        return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    res.json({ products: carrito.products });
});

CartsRoute.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;

    const carrito = carritos.find(c => c.id === parseInt(cid));
    if (!carrito) {
        return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    const producto = productos.find(p => p.id === parseInt(pid));
    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    carrito.products.push({ product: parseInt(pid) });

    res.status(201).json({ mensaje: 'Producto agregado correctamente al carrito', carrito });
});

export default CartsRoute;