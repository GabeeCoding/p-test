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

function Publish(userid:number, topic: string, message: string){
	const body = {message: message};

	fetch(getUrl(`plr-${userid}-${topic}`), {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			"x-api-key": apiKey!
		}
	});
}

function AreHeadersValid(headers: string[]){
	let valid = true
	headers.forEach((header) => {
		if(header === undefined){
			valid = false
		}
	})
	return valid
}

app.post("/invite", (req, resp) => {
	//add it to the list
	//then notify the user
	//how do we notify the user
	//using MessagingService and OpenCloud
	//read up on that
	let headers = req.headers
	//get userid, jobid and a filtered message from the headers
	let uid = headers.userId as string
	let jobId = headers.jobId as string
	let msg = headers.message as string
	let target = headers.target as string
	let name = headers.name as string
	let vars = [uid,jobId,msg,target,name]
	if(AreHeadersValid(vars) === false){
		resp.status(400).send("Invalid/missing headers")
		return
	}
	let userId = parseInt(uid)
	let targetUserId = parseInt(target)
	let targetdata = getUserData(targetUserId)!
	//getting the TARGET'S invite list, not the sender's
	//add the invite to the list
	//first, check if an invite has already been sent by the sender
	let match = targetdata.inviteList.find((invite) => invite.from == userId)
	if(match){
		//if there is a match
		//return with a status code
		resp.status(400).send("Already sent invite")
	}
	targetdata.inviteList.push({from: userId, jobId: jobId, message: msg})
	Publish(targetUserId, "Notify", `${name} sent you an invite!`)
	resp.status(200).send("Successfully sent invite")
});

app.get("/getInvites", (req,resp) => {

})

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