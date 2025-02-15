require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const ringRoute = require("../server/app/routes/Ring.route");
const braceletsRoute = require("../server/app/routes/Bracelets.route");
const earringsRoute = require("../server/app/routes/Earrings.route");
const necklacesRoute = require("../server/app/routes/Necklaces.route");
const orderRoutes = require('../server/app/routes/orderRoutes');

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
mongoose.set("strictQuery", true);

const path = require('path');
const uploadPath = path.join(__dirname, 'public');
app.use('/public', express.static(uploadPath));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected");
});

app.use('/rings', ringRoute);
app.use('/bracelets', braceletsRoute);
app.use('/earrings', earringsRoute);
app.use('/necklaces', necklacesRoute);
app.use('/orders', orderRoutes);

app.listen(8085, () => {
  console.log("server running");
});
