import { Router } from "express";

const route = Router();

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', precio: 300 },
];

route.get('/', (req, res) => {
    const { limit } = req.query;
    const productosLimitados = limit ? productos.slice(0, limit) : productos;
    res.render('home', { productos: productosLimitados });
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
    return ultimoProducto ? ultimoProducto.id + 1 : 1;
};

route.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category } = req.body;

    if (!title || !description || !code || !price || !stock || !category || status === undefined) {
        return res.status(400).json({ mensaje: 'Falta información' });
    }

    const nuevoProducto = {
        id: generarId(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category
    };

    productos.push(nuevoProducto);
    res.status(201).json({ mensaje: 'Producto agregado correctamente', producto: nuevoProducto });
});

route.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoActualizado = req.body;

    const productoEncontrado = productos.find(p => p.id === id);
    if (!productoEncontrado) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    const producto = {
        ...productoEncontrado,
        ...productoActualizado
    };

    const indice = productos.findIndex(p => p.id === id);
    productos[indice] = producto;

    res.json({ mensaje: 'Producto actualizado correctamente', producto });
});

route.delete('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const indice = productos.findIndex(p => p.id === pid);

    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    productos.splice(indice, 1);
    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
});

export default route;
