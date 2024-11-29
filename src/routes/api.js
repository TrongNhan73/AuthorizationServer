import express from 'express';
import apiController from '../controllers/apiController';
import userController from '../controllers/userApi.controller';
import groupController from '../controllers/groupApi.controller';
import { checkUserJWT, checkUserPermission } from '../middlewares/jwtAction.middleware';


const checkUserLogin = (req, res, next) => {
    const nonSecurePaths = ['/users/read/', '/users/create', '/users/update', '/users/delete'];
    if (nonSecurePaths.includes(req.path)) return next();


}


const routerAPI = express.Router();
routerAPI.all('*', checkUserJWT, checkUserPermission);




routerAPI.get('/testapi', apiController.testApi);
routerAPI.post('/register', apiController.handleRegister);
routerAPI.post('/login', apiController.handleLogin);
routerAPI.get('/account', apiController.getUserAccount);
routerAPI.post('/logout', apiController.logout);


routerAPI.get('/users/read/', userController.handleShowUsers);
routerAPI.post('/users/create', userController.handleCreateUsers);
routerAPI.put('/users/update', userController.handleUpdateUsers);
routerAPI.delete('/users/delete', userController.handleDeleteUsers);

routerAPI.get('/groups/read', groupController.handleGetAllGroup);
export default routerAPI;