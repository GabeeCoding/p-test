import * as express from "express"
import * as bodyparser from "body-parser"

let app = express();

app.use(bodyparser.json());

let userData: [{userId: number, inviteList: {from: number, jobId: string, message: string}[]}] = [
    {
        userId: 1,
        inviteList: [
            {
                from: 1,
                jobId: "0-9-A-F",
                message: "Come join me!"
            }
        ]
    },
];

app.get("/echo", (req, resp) => {
    resp.send(req.body);
});

let port = process.env.PORT||3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})