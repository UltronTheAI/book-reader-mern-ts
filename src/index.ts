import 'dotenv/config';
import express from 'express';
import connectToDB from './config/mongooseConfig';
import { Request, Response } from 'express';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


async function startServer() {
    try {
        await connectToDB();

        app.listen (PORT, ()=>{
            console.log(`Server running at http:///localhost:${process.env.PORT}`);
        } );
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
