import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { storeRouter } from '../Router/storeRouter.js'
import { reviewRouter } from '../Router/reviewRouter.js'
import { authRouter } from '../Router/authRouter.js'
import { userRouter } from '../Router/userRouter.js'
import authMiddleware from '../utils/authMiddleware.js'
import { paymentRouter } from '../Controllers/paymentController.js'

export const app = express()

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.use('/store', storeRouter)
app.use('/review',  reviewRouter)
app.use('/auth', authRouter)
app.use('/user',  userRouter)
app.use('/payment', paymentRouter)

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
})