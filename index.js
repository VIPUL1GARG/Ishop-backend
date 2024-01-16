const express = require('express');
const cors = require('cors');
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
app.use(express.static("public"));   // important for show in webpage 

app.use("/category", CategoryRouter);
app.use("/color", ColorRouter);
app.use("/product", ProductRouter);
app.use("/user", UserRouter);
app.use("/admin", AdminRouter);
app.use("/cart", CartRouter);
app.use("/order", OrderRouter);

const PORT= process.env.PORT || 5000
mongoose.connect(
    "mongodb://localhost:27017",     // important   when server not start then  replace  localhost  to 0.0.0.0
    {
        dbName: "ishop"
    }
).then(
    () => {
        app.listen(
            PORT,
            () => console.log("Server started")
        )
    }
).catch(
    () => {
        console.log("Unable to start server")
    }
)