import express from 'express';
import productRouter from './router/productsRouter.js'; 
import salesRouter from './router/salesRouter.js'; 
import inventoryRouter from './router/inventoryRouter.js';
import restocksRouter from './router/restocksRouter.js';
import cors from 'cors';

const app = express();
const port = 3001;


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Use CORS middleware with options
app.use(cors(corsOptions));
app.use(express.json());
app.use('/products', productRouter);
app.use('/sales', salesRouter);
app.use('/inventory', inventoryRouter);
app.use('/restocks', restocksRouter);
app.get('/', (_, res) => {
    res.send('api is running');
   
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

