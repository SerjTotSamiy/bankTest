import mongodb from 'mongodb'
import express from 'express'
import bodyParser from "body-parser";
import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
import cors from 'cors'
/*import {body, validationResult} from "express-validator";
import {rtrim} from "validator";*/


let app = express()
let secret = 'basvc';
const PORT = process.env.PORT || 3001
let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/',
    {
        useUnifiedTopology: true,
    })


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cookieParser(secret))
app.use(expressSession({
    secret: secret,
    resave: true,
    saveUninitialized: true,
}))
app.use(cors())

mongoClient.connect(async (error, mongo) => {

        if (!error) {
            let db = await mongo.db('bank');
            const users = await db.collection('cards')

            app.post('/card', async (req, res) => {
                let body = req.body;
                await users.insertOne(body)
                let elem = await users.findOne({card: body.card})
                if (body.card.length < 16) {
                    return false
                } else {
                    res.send({id: elem._id, amount: elem.amount})
                }
            })

        } else {
            console.error(error.code)
        }
    }
)

app.listen(PORT)
