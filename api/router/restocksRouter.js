import express from 'express';
import Restocks from '../model/mysql/restocks.js';

const router = express.Router();
const restocks = new Restocks();


router.post('/', (req, res) => {
    const newRestock = req.body;
    restocks.createRestock(newRestock, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, ...newRestock });
    });
});


router.get('/', (req, res) => {
    restocks.getAllRestocks((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});


router.get('/:id', (req, res) => {
    const restockId = req.params.id;
    restocks.getRestockById(restockId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!result) {
            return res.status(404).json({ error: 'Restock not found' });
        }
        res.status(200).json(result);
    });
});


router.put('/:id', (req, res) => {
    const restockId = req.params.id;
    const updatedRestock = req.body;
    restocks.updateRestock(restockId, updatedRestock, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Restock not found' });
        }
        res.status(200).json({ id: restockId, ...updatedRestock });
    });
});


router.delete('/:id', (req, res) => {
    const restockId = req.params.id;
    restocks.deleteRestock(restockId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Restock not found' });
        }
        res.status(204).send();
    });
});

export default router;