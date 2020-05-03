// Hashgraph Dependencies
const { Client, FileContentsQuery, FileId } = require("@hashgraph/sdk");

module.exports = async function getFileContents(req, operatorAccount, operatorPrivateKey) {
    
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
    
    const resp = await new FileContentsQuery()
        .setFileId(req.body.fileId)
        .execute(client);

    console.log(resp.contents);
    return resp.contents;
}
