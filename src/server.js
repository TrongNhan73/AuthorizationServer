import express from 'express';
import configViewEngine from './configs/viewEngine.config';
import router from './routes/web';
import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';



configDotenv();
const app = express();
configViewEngine(app);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('>>>>>app is running successfully on the port: ' + PORT)
})