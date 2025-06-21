import storage, { saveData } from '../storage.js';

export function getProducts(req, res) {
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify(storage.products));
}
//export function getProductsById() { }
export function addProducts(req, res) {
let body = '';
req.on('data', chunk => (body += chunk));
req.on('end', async () => {
    const products = JSON.parse(body);
    products.id = storage.products.length + 1;
    storage.products.push(products);
    await saveData('products');
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
    message: 'Producto creado',
    products
    }));
});
}
//export function updateProducts() { }
//export function deleteProducts() { }