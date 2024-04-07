import express from "express"
import cors from "cors"
import db from "./database.js"
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express();
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    method: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    key: "admin",
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    }
}))


const PORT = process.env.PORT || 8080;

app.get('/court', (req, res) => {
    console.log(req.session)
    if (req.session.username) {
        db.query(`select * from court`, (err, result) => {
            if (err) console.log(err);
            else return res.json({
                valid: true, 
                result: result, 
                username: req.session.username
            })
        })
    }
    else {
        return res.json({valid: false});
    }
})

app.post('/login', (req,res) => {
    let sql = 'select * from admin where username=? and password=?'
    const username= req.body.username
    const password= req.body.password
    db.query(sql, [username, password], (err, result) => {
        if (err) console.log(err);
        else {
            if (result.length >= 1) {
                req.session.username = result[0].username;
                return res.json({login: true, username: req.session.username});
            }
            else {
                return res.json({msg: 'Admin not found'})
            }
        }
    })
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('admin')
    return res.json({status: "success"})
})
app.listen(PORT, () => {
    console.log("server is running on port ", PORT)
})