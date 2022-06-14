const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: 'RmqIHrM8vHTTBIAJbH/I7mFFcSoPu7AFDJWrWOvZm6RDrLEUAiOtaxDwNgKmSdo4Q+QVnTxlgR2cKof76pe0BS2rKkhWJh9K81mUqo4NuO+FzVEPi3TUYiK/7rXXkaDsrHSiYAhTHWDJMThqNC/vPwdB04t89/1O/w1cDnyilFU=',
    channelSecret:  'cc8d848718e5dbbe3cf213aed988100f',
};

const client = new line.Client(config);

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.message || (req.body && req.body.events)) {
        if (req.body && req.body.events[0]) {
            message = {
                type: "text",
                text: req.body.events[0].message.text
            }
            console.log(message);
            if (req.body.events[0].replyToken) {
                client.replyMessage(req.body.events[0].replyToken, message);
            }
        }
        else {
            context.res = {
                status: 200,
                body: "You said" + req.query.message
            };
        }
    }
    else {
        context.res = {
            status: 200,
            body: "Please check the query string in the request body"
        };
    };
};