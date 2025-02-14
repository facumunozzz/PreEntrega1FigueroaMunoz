const socket = io();

socket.on('productosActualizados', (productos) => {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = ''; 

    productos.forEach(producto => {
        const li = document.createElement('li');
        li.innerText = `<h1>Nombre:</h1> ${producto.nombre} <div> <strong>Precio:</strong> $${producto.precio}`;
        listaProductos.appendChild(li);
    });
});


