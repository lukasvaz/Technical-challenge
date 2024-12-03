import express from 'express';
import Inventory from '../model/mysql/inventory.js';

const inventoryModel = new Inventory();
const router = express.Router();

router.get('/', (req, res) => {
    inventoryModel.getAllInventory((error, result) => {
        if (error) {
            return res.status(500).send('Error retrieving inventory items');
        }
        res.send(result);
    });
});

router.get('/:id', (req, res) => {
    const itemId = req.params.id;
    inventoryModel.getInventoryById(itemId, (error, result) => {
        if (error) {
            return res.status(500).send('Error retrieving inventory item');
        }
        res.send(result);
    });
});


router.put('/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;

    inventoryModel.updateInventory(itemId, updatedItem, (error, result) => {
        if (error) {
            return res.status(500).send(`Error updating inventory item ${error}`);
        }
        res.send(result);
    });
});



export default router;