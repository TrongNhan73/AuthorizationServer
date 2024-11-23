import express from 'express';
import configViewEngine from './config/viewEngine.config';
import routerWeb from './routes/web';
import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';
import { connection } from './config/database.config';
import { Cors } from './middlewares/Cors';
import routerAPI from './routes/api';
import cookieParser from 'cookie-parser';

configDotenv();
const app = express();
configViewEngine(app);

app.use(Cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
connection();
app.use('/', routerWeb);
app.use('/api/v1/', routerAPI);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('>>>>>app is running successfully on the port: ' + PORT)
})