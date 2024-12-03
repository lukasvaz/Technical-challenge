import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

class Sales {
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

    createSale(sale, callback) {
        const query = 'INSERT INTO Sales SET ?';
        this.connection.query(query, sale, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    getAllSales(callback) {
        const query = 'SELECT * FROM Sales';
        this.connection.query(query, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    getSaleById(saleId, callback) {
        const query = 'SELECT * FROM Sales WHERE id = ?';
        this.connection.query(query, [saleId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results[0]);
        });
    }

    updateSale(saleId, sale, callback) {
        const query = 'UPDATE Sales SET ? WHERE id = ?';
        this.connection.query(query, [sale, saleId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    deleteSale(saleId, callback) {
        const query = 'DELETE FROM Sales WHERE id = ?';
        this.connection.query(query, [saleId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
}

export default Sales;