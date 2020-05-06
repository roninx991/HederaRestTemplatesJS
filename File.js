// Hashgraph Dependencies
const { Client, FileContentsQuery, FileId, Hbar, FileCreateTransaction } = require("@hashgraph/sdk");

// UTF-8 Decode
const utf8 = require("utf8");

module.exports.createFile = async function createFile(req, operatorAccount, operatorPrivateKey) {
    
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

    

    const transactionId = await new FileCreateTransaction()
        .setContents(req.body.content)
        .addKey(client._getOperatorKey())
        .setMaxTransactionFee(new Hbar(15))
        .execute(client);

    const receipt = await transactionId.getReceipt(client);  
    
    return receipt;
}

module.exports.getFile = async function getFile(req, operatorAccount, operatorPrivateKey) {
    
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
    const fileId = new FileId(req.body.fileId);

    //Get file contents
    const fileContents = await new FileContentsQuery()
        .setFileId(fileId)
        .execute(client);

    return String.fromCharCode.apply(null, fileContents);
}
