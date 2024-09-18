import express from "express";
import env from './env'

const app = express();
const PORT = env.PORT ||  5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
