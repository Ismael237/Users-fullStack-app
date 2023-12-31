require("./config/db");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const roleRoute = require("./routes/role");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}),);

app.use("/api/users", userRoute);
app.use("/api/roles", roleRoute);


module.exports = app;