import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
function clearDatabase(connection) {
    connection.execute('DELETE FROM Inventory');
    connection.execute('DELETE FROM Sales');
    connection.execute('DELETE FROM Restocks');
    connection.execute('DELETE FROM Products');

}

function populateDatabase(connection) {
        
        const productsData = [
            { id:1,name: 'Product 1', price: 100 },
            { id:2,name: 'Product 2', price: 200 },
            { id:3,name: 'Product 3', price: 300 },
            { id:4,name: 'Product 4', price: 400 },
            { id:5,name: 'Product 5', price: 500 }
        ];
        
        for (const product of productsData) {
            connection.execute(
                'INSERT INTO Products (id, name, price) VALUES (?, ?, ?)',
                [product.id,product.name, product.price]
            );
        }
        
        const restocksData = [];
        const currentDate = new Date();
        
        for (let month = 0; month < 6; month++) {
            const restockDate = new Date(currentDate);
            restockDate.setMonth(restockDate.getMonth() - month);
            
            for (let i = 0; i < 5; i++) {
                var product = Math.floor(Math.random() * 4) + 1;
                console.log(product)
                restocksData.push({
                    id_product: product,
                    quantity: i + 10,
                    _date: restockDate.toISOString().slice(0, 19).replace('T', ' ')
                });
            }
        }

        for (const restock of restocksData) {
            connection.execute(
                'INSERT INTO Restocks (id_product, quantity, _date) VALUES (?,  ?, ?)',
                [restock.id_product, restock.quantity, restock._date]
            );
        }


        const salesData = [];

        for (let month = 0; month < 6; month++) {
            const saleDate = new Date(currentDate);
            saleDate.setMonth(saleDate.getMonth() - month);

            for (let i = 0; i < 5; i++) {
                var product= Math.floor(Math.random() * 4) + 1

                salesData.push({
                    id_product: product,
                    quantity: i + 1,
                    _date: saleDate.toISOString().slice(0, 19).replace('T', ' ')
                });
            }
        }

        for (const sale of salesData) {
            connection.execute(
                'INSERT INTO Sales (id_product, quantity, _date) VALUES (?,  ?, ?)',
                [sale.id_product, sale.quantity, sale._date]
            )
            
        }

}
async function seedDatabase() {
        console.log()
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        });
    

    try {
        console.log('Connected to the database.');
        clearDatabase(connection);
        populateDatabase(connection);

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        connection.end();
        console.log('Connection closed.');
    }
}

seedDatabase();