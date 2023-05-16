import express from 'express'
const router = express.Router();
import { login , logout ,verifyToken} from '../controllers/auth.controller.js'
// import { authenticate } from '../middlewares/authenticate'

router.post('/login', login);
router.post('/logout', logout);
router.post('/verifyToken', verifyToken);

export default router;

