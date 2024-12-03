import express from 'express';
import productRouter from './router/productsRouter.js'; 
import salesRouter from './router/salesRouter.js'; 
 
const app = express();
const port = 3000;
app.use(express.json());
app.use('/products', productRouter);
app.use('/sales', salesRouter);

app.get('/', (_, res) => {
    res.send('api is running');
   
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

