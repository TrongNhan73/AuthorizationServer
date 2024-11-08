import express from 'express';
import apiController from '../controllers/apiController';
import userConller from '../controllers/userApi.controller';

const routerAPI = express.Router();





routerAPI.get('/testapi', apiController.testApi);
routerAPI.post('/register', apiController.handleRegister);
routerAPI.post('/login', apiController.handleLogin);


routerAPI.get('/users/read', userConller.handleShowUsers);
routerAPI.post('/users/create', userConller.handleCreateUsers);
routerAPI.put('/users/update', userConller.handleUpdateUsers);
routerAPI.delete('/users/delete', userConller.handleDeleteUsers);
export default routerAPI;