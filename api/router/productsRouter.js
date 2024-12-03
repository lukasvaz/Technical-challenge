import express from 'express';
import Product from '../model/mysql/product.js';

const productModel= new Product();
const router = express.Router();
router.get('/', (req, res) => {
    productModel.getAllProducts((error, result) => {
        if (error) {
            return res.status(500).send('Error retrieving products');
        }
        res.send(result);
    });
})

router.get('/:id', (req, res) => {
    const saleId = req.params.id;
    productModel.getProductById(saleId, (error, result) => {
        if (error) {
            return res.status(500).send('Error retrieving product');
        }
        res.send(result);
    });
});


router.post('/', (req, res) => {
    const newProduct = req.body;
    productModel.createProduct(newProduct, (error, result) => {
        if (error) {
            return res.status(500).send(`Error saving new product ${error}`);
        }
        res.send(result);
    });
});


router.put('/:id', (req, res) => {
    const saleId = req.params.id;
    const updatedProduct = req.body ;

    productModel.updateProduct(saleId, updatedProduct, (error, result) => {
        if (error) {
            return res.status(500).send('Error updating product');
        }
        res.send(result);
    });
});


router.delete('/:id', (req, res) => {
    const saleId = req.params.id;
    productModel.deleteProduct(saleId, (error, result) => {
        if (error) {
            return res.status(500).send('Error deleting product');
        }
        res.send(result);
    });
});

export default router;