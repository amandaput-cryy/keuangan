const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));


const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

const transaksiRoutes = require('./src/routes/transaksi');
const kategoriRoutes = require('./src/routes/kategori');

app.use('/api/transaksi', transaksiRoutes);
app.use('/api/kategori', kategoriRoutes);


app.listen(3000,()=>{
    console.log(
        "Server running http://localhost:3000"
    );
});