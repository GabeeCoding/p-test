let express = require("express")

let app = express();

let userData = {
    [1]: {

    }
};
/*
    user object
    [123456]: {
        chats: {
            [12]: [] message table
        }
    }
*/
app.get("/", (req, resp) => {
    resp.send(req.rawHeaders.toString())
});