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

function initUserData(userid:number){
    //Adds user data to the array
    userData.push({userId: userid, inviteList: []});
    return userData.find(user => user.userId == userid)
}

function getUserData(userid: number){
    //Retrieves user data from array
    //If it doesn't exist, create it
    let data = userData.find((data) => data.userId == userid)
    if(data){
        return data
    } else {
        return initUserData(userid);
    }
}

app.get("/echo", (req, resp) => {
    resp.send(req.body);
});

app.get("/headers", (req, resp) => {
    resp.send(req.headers);
});

let port = process.env.PORT||3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})