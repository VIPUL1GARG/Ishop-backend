const express = require('express');
const cors = require('cors');
require('dotenv').config()
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
mongoose.connect(
    // "mongodb://0.0.0.0:27017",        // important   when server not start then  replace  localhost  to 0.0.0.0
   process.env.DATABASE_URI,
    {
        dbName: "ishop"
    }
    // mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })

)
.then(
    () => {
        app.listen(
            5000,
            () => console.log("Server started")
        )
    }
).catch(
    (err) => {
        console.log(err)
        console.log("Unable to start server")
    }
)