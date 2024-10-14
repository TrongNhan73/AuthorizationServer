import express from 'express';
import { getHomePage, getUser, handleCreateUser, handleDeleteUser, handleUpdateUser, handleGetUpdatePage } from '../controllers/user.controller';


const router = express.Router();




router.get('/', getHomePage);
router.get('/users', getUser);
router.post('/users/create-user', handleCreateUser);
router.post('/users/delete-user/:id', handleDeleteUser);
router.post('/users/update-user-page/:id', handleGetUpdatePage);
router.post('/users/update-user/:id', handleUpdateUser);

export default router;