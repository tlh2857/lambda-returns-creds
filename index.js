exports.handler = async (event) => {
    
// Load the AWS SDK
var AWS = require('aws-sdk'),
    region = "us-east-1";

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: region
});

var secret; 


let secrets = await client.listSecrets().promise();
console.log(secrets)


var secretName = secrets.SecretList[0].Name;
console.log(secretName)

var secRes = await client.getSecretValue({SecretId: secretName}).promise();
    console.log(secRes)
        if ('SecretString' in secRes) {
            secret = secRes.SecretString;
        }


    const response = {
        statusCode: 200,
        body: JSON.stringify(`AWS_SESSION_TOKEN = ${process.env.AWS_SESSION_TOKEN} AWS_ACCESS_KEY_ID = ${process.env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY = ${process.env.AWS_SECRET_ACCESS_KEY}`),
    };
    return response;
};
