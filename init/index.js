
const mongoose = require("mongoose")
const initData = require("./data.js")
const Listing = require("../models/listing.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL)
}

main().then(()=>{
    console.log("Connection to DB")
}).catch((err)=>{
    console.log(`Unsuccessful to connect DB due to ` + err)
})

const initDB = async()=>{
    await Listing.deleteMany({})
    initData.data = initData.data.map((obj) => ({...obj, owner: "692d97919a1154fd121cd15b" }))
    await Listing.insertMany(initData.data)
    console.log("Data was initialized")
}

initDB();
