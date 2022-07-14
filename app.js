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

let port = process.env.PORT||3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})