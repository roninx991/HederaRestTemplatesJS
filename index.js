// Server Dependencies
const express = require('express');
const axios = require('axios');

// API Dependencies
const hashRoutes = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

// Hashgraph Dependencies
// const { Client, FileContentsQuery, FileId } = require("@hashgraph/sdk");

// Hedera Environment Constants Setup
require("dotenv").config();
const operatorPrivateKey = process.env.OPERATOR_KEY;
const operatorAccount = process.env.OPERATOR_ID;

// Logging Dependencies
const log4js = require('log4js');

// Logging Config
log4js.configure('./config/log4js.json');
const logger = log4js.getLogger("app");

// API Imports
const createClient = require('./Client');
const getKey = require('./GenerateKey');
const File = require('./File');

// Server Constants
const app = express();
const port = 4000;

// Main Body

app.use(cors());
app.use(bodyParser.json());

app.post('/createClient', function(req, res) {

    logger.debug("Request received from Client:");
    logger.info("Request Body: " + JSON.stringify(req.body));
    logger.info("Request Query: " + JSON.stringify(req.query));

    var client = createClient(req, operatorAccount, operatorPrivateKey);

    res.send(client);
});

app.get('/getKey', async function(req, res) {

    logger.debug("Request received from Client:");
    logger.info("Request Body: " + JSON.stringify(req.body));
    logger.info("Request Query: " + JSON.stringify(req.query));

    var key = await getKey();

    res.send(key);
});

app.post('/createFile', async function(req, res) {

    logger.debug("Request received from Client:");
    logger.info("Request Body: " + JSON.stringify(req.body));
    logger.info("Request Query: " + JSON.stringify(req.query));

    var client = await File.createFile(req, operatorAccount, operatorPrivateKey);

    res.send(client);
});

app.post('/getFile', async function(req, res) {

    logger.debug("Request received from Client:");
    logger.info("Request Body: " + JSON.stringify(req.body));
    logger.info("Request Query: " + JSON.stringify(req.query));

    var client = await File.getFile(req, operatorAccount, operatorPrivateKey);

    res.send(client);
});


app.listen(port, function() {
    logger.info("Server started on port " + port);
});
