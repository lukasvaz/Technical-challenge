import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

class Product {
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

    createProduct(product, callback) {
        const query = 'INSERT INTO Products SET ?';
        this.connection.query(query, product, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
    
    getAllProducts(callback) {
        const query = 'SELECT * FROM Products';
        this.connection.query(query, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
    getProductById(productId, callback) {
        const query = 'SELECT * FROM Products WHERE id = ?';
        this.connection.query(query, [productId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results[0]);
        });
    }

    updateProduct(productId, product, callback) {
        const query = 'UPDATE Products SET ? WHERE id = ?';
        this.connection.query(query, [product, productId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    deleteProduct(productId, callback) {
        const query = 'DELETE FROM Products WHERE id = ?';
        this.connection.query(query, [productId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
}

export default Product;
