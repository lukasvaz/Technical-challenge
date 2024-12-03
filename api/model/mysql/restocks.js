import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

class Restocks {
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

    createRestock(restock, callback) {
        const query = 'INSERT INTO Restocks SET ?';
        this.connection.query(query, restock, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    getAllRestocks(callback) {
        const query = 'SELECT * FROM Restocks';
        this.connection.query(query, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    getRestockById(restockId, callback) {
        const query = 'SELECT * FROM Restocks WHERE id = ?';
        this.connection.query(query, [restockId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results[0]);
        });
    }

    updateRestock(restockId, restock, callback) {
        const query = 'UPDATE Restocks SET ? WHERE id = ?';
        this.connection.query(query, [restock, restockId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    deleteRestock(restockId, callback) {
        const query = 'DELETE FROM Restocks WHERE id = ?';
        this.connection.query(query, [restockId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
}

export default Restocks;