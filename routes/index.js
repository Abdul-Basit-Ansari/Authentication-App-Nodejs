import express from 'express'
import cookieParser from 'cookie-parser';
import user from './users.route.js'
import auth from './auth.route.js'
import authenticate from "../middleware/auth.js";
import bodyParser from "body-parser";

export const app = express();
const router = express.Router()

app.use(cookieParser());
app.use(bodyParser.json());
router.use('/auth',auth)

// app.use(authenticate);
router.use('/users',authenticate,user)

export default router