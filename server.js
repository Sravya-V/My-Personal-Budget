// Budget API
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const application = express();
const port = 3000;
const budgetModel = require('./Models/budgetValues');

application.use(cors());
application.use(bodyParser.json());
application.use('/', express.static("public"));

const MONGODB_URI = "mongodb://localhost:27017/mongo_budget";

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDb");
}).catch((err) => {
    console.log("Unable to connect to Database.\n", err);
})

application.get("/budget", async (request, response) => {
    await budgetModel.find().then((data) => {
        response.json(data);
    }).catch((connectionError) => {
        console.error(connectionError);
        response.status(400).json({error:'Internal Server Error'})
    });
})

application.post('/budget', async (request, response) => {
    const budget = new budgetModel(request.body);
    await budget.save().then((data) => {
        response.json(data);
    }).catch((connectionError) => {
        console.error(connectionError);
        response.status(400).json({error: connectionError.message})
    });
})

application.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
})