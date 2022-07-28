import * as express from "express"
import * as bodyparser from "body-parser"
import fetch from 'node-fetch';

const placeId = "3788520514"
const apiKey = process.env.APIKEY
if(!apiKey){
	console.error("No api key!")
}

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

function getUrl(topic: string){
	return `https://apis.roblox.com/messaging-service/v1/universes/${placeId}/topics/${topic}`
}

app.post("/invite", (req, resp) => {
	//add it to the list
	//then notify the user
	//how do we notify the user
	//using MessagingService and OpenCloud
	//read up on that

})

app.get("/echo", (req, resp) => {
	resp.send(req.body);
});

app.get("/headers", (req, resp) => {
	resp.send(req.headers);
});

app.get("/testSend", (req, resp) => {
	//send it
	//--POST https://apis.roblox.com/messaging-service/v1/universes/3788520514/topics/{topic}

	const body = {message: "heheheha"};

	fetch(getUrl("Test"), {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			"x-api-key": apiKey!
		}
	});
	resp.send("Sent")
})

let port = process.env.PORT||3000
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})