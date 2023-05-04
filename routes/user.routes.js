import express from 'express';
const router = express.Router();
import { createUser, deleteUser, editUser, getAllUsers, getUserById, home } from '../controller/user.controller.js';


router.get('/',home)
router.post('/createUser', createUser);
router.get('/getAllUsers', getAllUsers);
router.put('/editUser/:id', editUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getUser/:id', getUserById);

export default router;