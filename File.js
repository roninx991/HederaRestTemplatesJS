// Hashgraph Dependencies
const { Client, FileId, Hbar, FileCreateTransaction, FileContentsQuery, FileInfoQuery, FileAppendTransaction, FileDeleteTransaction } = require("@hashgraph/sdk");

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

module.exports.appendFile = async function appendFile(req, operatorAccount, operatorPrivateKey) {
    
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
    const fileAppendTransactionId = await new FileAppendTransaction()
        .setFileId(fileId)
        .setContents(req.body.content)
        .execute(client);

    const appendReceipt = await fileAppendTransactionId.getReceipt(client);
    console.log(`Transaction Status: ${appendReceipt.status}`)

    return appendReceipt.status;
}

module.exports.getFileInfo = async function getFileInfo(req, operatorAccount, operatorPrivateKey) {
    
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
    const fileInfo = await new FileInfoQuery()
        .setFileId(fileId)
        .execute(client);

    return fileInfo;
}

module.exports.deleteFile = async function deleteFile(req, operatorAccount, operatorPrivateKey) {
    
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

    const deleteFileTransactionId = await new FileDeleteTransaction()
    .setFileId(fileId) // Define which file to delete
    .setMaxTransactionFee(Hbar.of(100))
    .execute(client);

    const deleteFileReceipt = await deleteFileTransactionId.getReceipt(client);
    console.log("deleted file receipt, won't contain a file ID ", JSON.stringify(deleteFileReceipt));
    
    return deleteFileReceipt;
}
