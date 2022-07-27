import * as express from "express"

let app = express();

let userData = {
    1: {
        inviteList: [
            {
                from: 1,
                jobId: "",
                message: "Come join me!"
            }
        ]
    }
};
/*
    user object
    [123456]: {
        inviteList
    }
*/
app.get("/", (req, resp) => {
    resp.send(req.headers);
});

let port = process.env.PORT||3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})