import 'dotenv/config';
import express from 'express';
import connectToDB from './config/mongooseConfig';

import bookRouter from './routes/book.routes';
import chapterRouter from './routes/chapter.routes';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import commentRouter from './routes/comment.routes';
import { checkAndSeedDatabase } from './utils/seedUtils';
import checkAndInitializeAdmin from './utils/adminInitializer';


const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use( ('/api'), bookRouter);
app.use( ('/api'), chapterRouter);
app.use( ('/api'), authRouter);
app.use( ('/api'), userRouter);
app.use( ('/api'), commentRouter);

async function startServer() {
    try {
        await connectToDB();

        await checkAndSeedDatabase();
        await checkAndInitializeAdmin();
        
        app.listen (PORT, ()=>{
            console.log(`Server running at http:///localhost:${process.env.PORT}`);
        } );
    } catch (error) {
        console.error(' Failed to start server: ', error);
        process.exit(1);
    }
}

startServer();
