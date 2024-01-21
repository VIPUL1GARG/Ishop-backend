const express = require('express');
const cors = require('cors');
require('dotenv').config();
const CategoryRouter = require('./Routers/CategoriesRouter');
const mongoose = require('mongoose');
const ColorRouter = require('./Routers/ColorRouter');
const ProductRouter = require('./Routers/ProductRouter');
const UserRouter = require('./Routers/UserRouter');
const AdminRouter = require('./Routers/AdminRouter');
const CartRouter = require('./Routers/CartRouter');
const OrderRouter = require('./Routers/OrderRouter');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/category", CategoryRouter);
app.use("/color", ColorRouter);
app.use("/product", ProductRouter);
app.use("/user", UserRouter);
app.use("/admin", AdminRouter);
app.use("/cart", CartRouter);
app.use("/order", OrderRouter);
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
        console.log("Server started");
    });
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Gracefully close the MongoDB connection when the Node process is terminated
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    });
});
