import express from 'express'
const router = express.Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller.js'
// import { authenticate } from '../middlewares/authenticate'

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id',  updateUser);
router.delete('/:id',  deleteUser);

export default router;

