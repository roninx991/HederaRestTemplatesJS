// Hashgraph Dependencies
const { Ed25519PrivateKey }= require('@hashgraph/sdk');

module.exports = async function generateKey() {

    var key = {};

    const privateKey = await Ed25519PrivateKey.generate();
    const publicKey = privateKey.publicKey;

    key = {
        "privKey" : privateKey,
        "pubKey" : publicKey
    };

    return key;
    
}