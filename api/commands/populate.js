import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function clearDatabase(connection) {
    await connection.execute('DELETE FROM Inventory');
    await connection.execute('DELETE FROM Sales');
    await connection.execute('DELETE FROM Restocks');
    await connection.execute('DELETE FROM Products');
}

async function populateDatabase(connection) {
    const productsData = [
        { name: 'Product 1', price: 100 },
        { name: 'Product 2', price: 200 },
        { name: 'Product 3', price: 300 },
        { name: 'Product 4', price: 400 },
        { name: 'Product 5', price: 500 },
    ];

    //insert product data
    for (const product of productsData) {
        await connection.execute(
            'INSERT INTO Products (name, price) VALUES (?, ?)',
            [product.name, product.price]
        );
    }

    console.log('Products table populated.');


    // Insert restock data
    const [rows] = await connection.execute('SELECT id FROM Products');
    const productIds = rows.map(row => row.id);

    const currentDate = new Date();

    const restocksData = [];
    for (let month = 0; month < 6; month++) {
        const restockDate = new Date(currentDate);
        restockDate.setMonth(restockDate.getMonth() - month);

        for (let i = 0; i < 5; i++) {
            const randomProduct = productIds[Math.floor(Math.random() * productIds.length)];
            restocksData.push({
                id_product: randomProduct,
                quantity: i + 10,
                _date: restockDate.toISOString().slice(0, 19).replace('T', ' '),
            });
        }
    }

    for (const restock of restocksData) {
        await connection.execute(
            'INSERT INTO Restocks (id_product, quantity, _date) VALUES (?, ?, ?)',
            [restock.id_product, restock.quantity, restock._date]
        );
    }

    console.log('Restocks table populated.');

    // Insert sales data
    const salesData = [];
    for (let month = 0; month < 6; month++) {
        const saleDate = new Date(currentDate);
        saleDate.setMonth(saleDate.getMonth() - month);

        for (let i = 0; i < 5; i++) {
            const randomProduct = productIds[Math.floor(Math.random() * productIds.length)];
            salesData.push({
                id_product: randomProduct,
                quantity: (Math.floor(Math.random() * productIds.length))+1,
                _date: saleDate.toISOString().slice(0, 19).replace('T', ' '),
            });
        }
    }

    for (const sale of salesData) {
        await connection.execute(
            'INSERT INTO Sales (id_product, quantity, _date) VALUES (?, ?, ?)',
            [sale.id_product, sale.quantity, sale._date]
        );
    }

    console.log('Sales table populated.');
}

async function seedDatabase() {
    console.log({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
    })
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
    });

    try {
        console.log('Connected to the database.');
        await clearDatabase(connection);
        await populateDatabase(connection);
        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await connection.end();
        console.log('Connection closed.');
    }
}

seedDatabase();
