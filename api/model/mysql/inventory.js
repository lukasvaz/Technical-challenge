import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

class Inventory {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to the database:', err.stack);
                return;
            }
        });
    }

    getAllInventory(callback) {
        const query = `
            SELECT Products.id,Products.name, Inventory.quantity, Products.price
            FROM Inventory
            JOIN Products ON Inventory.id_product = Products.id
        `;
        // const query = 'SELECT * FROM Inventory';
        this.connection.query(query, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        })}
    
    getInventoryById(id_product, callback) {
        const query = 'SELECT * FROM Inventory WHERE id_product = ?';
        this.connection.query(query, [id_product], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results[0]);
        });
    }
    
    updateInventory(id_product, inventory, callback) {
        const query = 'UPDATE Inventory SET quantity = ? WHERE id_product = ?';
        this.connection.query(query, [inventory.quantity, id_product], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
}

export default Inventory;