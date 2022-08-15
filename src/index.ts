import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import {connect} from "mongoose";
import { json } from 'body-parser';

import packageRoutes from './routes/packages';
import trackRoutes from './routes/track';

connect('mongodb://localhost:27017/pcktracking');

const app = express();
app.use(cors());

app.use(json());

app.use('/packages', packageRoutes);

app.use('/tracking', trackRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to Package Tracking")
})

app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

const port = process.env.PORT || 3001;
app.listen(port, ()=> console.log(`Carbon App is running on Port ${port}`));
