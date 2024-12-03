import express from 'express';
import Sales from '../model/mysql/sales.js';

const router = express.Router();
const sales = new Sales();

// Create a new sale
router.post('/', (req, res) => {
    const newSale = req.body;
    sales.createSale(newSale, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, ...newSale });
    });
});

// Get all sales
router.get('/', (req, res) => {
    sales.getAllSales((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Get a sale by ID
router.get('/:id', (req, res) => {
    const saleId = req.params.id;
    sales.getSaleById(saleId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!result) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.status(200).json(result);
    });
});

// Update a sale
router.put('/:id', (req, res) => {
    const saleId = req.params.id;
    const updatedSale = req.body;
    sales.updateSale(saleId, updatedSale, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.status(200).json({ id: saleId, ...updatedSale });
    });
});

// Delete a sale
router.delete('/:id', (req, res) => {
    const saleId = req.params.id;
    sales.deleteSale(saleId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.status(204).send();
    });
});

export default router;