import express from 'express';
import apiController from '../controllers/apiController';
import userController from '../controllers/userApi.controller';
import groupController from '../controllers/groupApi.controller';

const routerAPI = express.Router();





routerAPI.get('/testapi', apiController.testApi);
routerAPI.post('/register', apiController.handleRegister);
routerAPI.post('/login', apiController.handleLogin);


routerAPI.get('/users/read/', userController.handleShowUsers);
routerAPI.post('/users/create', userController.handleCreateUsers);
routerAPI.put('/users/update', userController.handleUpdateUsers);
routerAPI.delete('/users/delete', userController.handleDeleteUsers);

routerAPI.get('/groups/read', groupController.handleGetAllGroup);
export default routerAPI;