import express from 'express';
import configViewEngine from './configs/viewEngine.config';
import router from './routes/web';
import { configDotenv } from 'dotenv';
configDotenv();
const app = express();
configViewEngine(app);




app.use('/', router);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('>>>>>app is running successfully on the port: ' + PORT)
})