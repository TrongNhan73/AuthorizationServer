import express from 'express';
import apiController from '../controllers/apiController';

const routerAPI = express.Router();





routerAPI.get('/testapi', apiController.testApi);
routerAPI.post('/register', apiController.handleRegister);
export default routerAPI;