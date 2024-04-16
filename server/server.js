import express from 'express'
import cors from 'cors'
import courtRoutes from './routes/courtRoutes.js'
import authRoutes from './routes/authRoutes.js'
import empRoutes from './routes/empRoutes.js'
import progRoutes from './routes/progRoutes.js'
import productRoutes from './routes/productRoutes.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express();
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    method: ['POST', 'GET'],
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


app.use('/auth', authRoutes);
app.use('/court-manage', courtRoutes);
app.use('/employee', empRoutes);
app.use('/training-program', progRoutes);
app.use('/product-manage', productRoutes);
app.listen(8080, () => {
    console.log("server is running on port 8080");
})