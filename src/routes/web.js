import express from 'express';
import { getHomePage, getUser, handleCreateUser, handleDeleteUser, handleUpdateUser, handleGetUpdatePage } from '../controllers/user.controller';

const routerWeb = express.Router();




routerWeb.get('/', getHomePage);
routerWeb.get('/users', getUser);
routerWeb.post('/users/create-user', handleCreateUser);
routerWeb.post('/users/delete-user/:id', handleDeleteUser);
routerWeb.post('/users/update-user-page/:id', handleGetUpdatePage);
routerWeb.post('/users/update-user/:id', handleUpdateUser);

export default routerWeb;