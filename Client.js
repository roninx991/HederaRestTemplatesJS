// Hashgraph Dependencies
const { Client } = require("@hashgraph/sdk");

module.exports = function createClient(req, operatorAccount, operatorPrivateKey) {

    if (operatorPrivateKey == null || operatorAccount == null) {
        throw new Error("environment variables OPERATOR_KEY and OPERATOR_ID must be present");
    }

    var clientProps = {
        network: { 
            [req.body.networkAddr] : req.body.nodeId 
        },
        operator: {
            account: operatorAccount,
            privateKey: operatorPrivateKey
        }    
    }

    const client = new Client(clientProps);
    console.log("# Client.js: " + req.query.maxQueryPayment);
    
    if (req.query.maxQueryPayment !== null) {
        client.setMaxQueryPayment(req.query.maxQueryPayment);
    }
    
    if (req.query.maxTransactionFee !== null) {
        client.setMaxTransactionFee(req.query.maxTransactionFee);
    }
    
    return client;    
}