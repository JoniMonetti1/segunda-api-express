const express = require('express');
const morgan = require('morgan');
const app = express();
let {products} = require('./products.js');

//settings
app.set('port', 3000);
app.set('appName', 'ExpressAPI');
app.set('case sensitive routing', true);

//middlewares
app.use(morgan('dev'));
app.use(express.json());


//routes
app.get('/', (req, res) => {
    res.send('API RESTful de productos');
})

app.get('/products', (req, res) => {
    res.json(products);
})

app.post('/products', (req, res) => {
    const newProduct = {...req.body, id: products.length + 1}
    products.push(newProduct);
    res.status(201).json(newProduct);
})

app.put('/products/:id', (req, res) => {
    const newData = req.body;
    const productIndex = products.findIndex(product => product.id === parseInt(req.params.id));
    if(productIndex !== -1) {
        products[productIndex] = {...products[productIndex], ...newData};
        res.json({
            "message": "Product updated successfully"
        })
    } else {
        res.status(404).send('Producto no encontrado');
    }
})

app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(product => product.id === parseInt(req.params.id));
    if(index !== -1) {
        products.splice(index, 1);
        res.send(`Elemento con id: ${index} ha sido eliminado con exito`);
    } else {
        res.status(404).send('Producto no encontrado');
    }
})

app.get('/products/:id', (req, res) => {
    const productFound = products.find(product => product.id === parseInt(req.params.id));
    if(productFound) {
        res.json(productFound);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});


app.listen(app.get('port'), () => {
    console.log(`server ${app.get('appName')} listening on port ${app.get('port')}`);
});