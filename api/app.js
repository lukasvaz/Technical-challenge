import express from 'express';
import salesRouter from './router/products.js'; 
 
const app = express();
const port = 3000;
app.use(express.json());
app.use('/products', salesRouter);
app.get('/', (req, res) => {
    res.send('api is running');
   
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

