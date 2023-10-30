const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

dotenv.config()

//After initialize the mongoose check de db connection based on url
//Connect to DB and then if success print ok in log,if not print catch error and print
mongoose.connect(process.env.MONGO_URL).then(()=>console.log('DB connected')).catch((err)=>console.log(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT || port, () => console.log(`Foodly Backend API app listening on port ${process.env.PORT}!`))
