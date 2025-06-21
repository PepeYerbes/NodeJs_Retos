import { getProducts, addProducts } from '../controllers/productController.js';

export function productRouter(req, res) {
if (req.pathname === '/products' && req.method === 'GET') {
    return getProducts(req, res);
}
if (req.pathname === '/products' && req.method === 'POST') {
    return addProducts(req, res);
}
return false
}