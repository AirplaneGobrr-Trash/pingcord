const db = require("./database.js")
const crypto = require('crypto')

async function checkDatabase() {
    await db.makeObject("users", {})
    await db.makeObject("servers", {})
    await db.makeObject("findUser", { token: {}, email: {}, username: {} })
}

async function generateToken() {
    var buffer = await crypto.randomBytes(48)
    var token = buffer.toString('hex');
    token = `5_${token}`
    return token
}

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

async function makeUser(username, password, email) {
    if (!username || !password || !email) return console.log("No username, password or email!")
    await checkDatabase()
    var date = new Date().getTime()
    var userID = `4_${date}`
    var userToken = await generateToken()
    var userTag = between(1000, 9999)

    email = email.replace(".", "_DOT_")
    var userData = {
        madeDate: date, // might not use
        warns: {},
        about: "",
        username: username,
        tag: userTag,
        servers: [],
        token: userToken,
        password: password,
        email: email
    }
    await db.makeObject(`users.${userID}`, userData)
    await db.makeObject(`findUser.token.${userToken}`, userID)
    await db.makeObject(`findUser.email.${email}`, userID)
    await db.makeObject(`findUser.username.${username}:${userTag}`, userID)
    return userToken
}

async function makeServer(serverName, ownerID){
    if (!serverName || !ownerID) return console.log("No server name or owner ID")
    await checkDatabase()
    var date = new Date().getTime()

    var serverID = `1_${date}`
    var serverData = {
        madeDate: "", // might not use
        owner: ownerID,
        roles: {}, //Ingore, roles worked on later!
        members: {},
        bots:{}, //Ignore
        emojis:{}, //Ingore
        channels: {
            "2_time": {
                rolePerms: {}, //Ingore
                messages: { //I might change this to an array that has 100 to 1000 messages
                    "3_0": {
                        sentTime: 0,
                        member: "4_0",
                        message: "Welcome to pingcord! We hope you enjoy!",
                        files: [] //Ingore
                    }
                },
                webhooks: {}, //Ingore
                name: "general",
                index: 0,
                category: "3-1_0",
                type: "3--1"
            }
        },
        categorys: {
            "3-1_0": {
                rolePerms: {}, //Ingore
                index: 0
            }
        }
    }
}

async function userLogin(email, password) {
    email = email.replace(".", "_DOT_")
    var userID = await db.get(`findUser.email.${email}`)
    if (!userID) return console.log("No user found")
    var userPassword = await db.get(`users.${userID}.password`)
    if (userPassword != password) return console.log("Wrong password")
    console.log("Good login!")
    return await db.get(`user.${userID}.token`)
}

//makeUser("user", "pass", "mail.com")
//userLogin("mail.com", "pass")


module.exports = {
    makeUser,
    userLogin
}