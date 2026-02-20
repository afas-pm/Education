import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import courseRouter from './routes/courseRoute.js';
import adminRouter from './routes/adminRoute.js';
import paymentRouter from './routes/paymentRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Body-parser error handler
app.use((err, req, res, next) => {
    if (err && err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ success: false, message: 'Invalid JSON' });
    }
    next(err);
});

//DB CONNECTION
connectDB();

//ROUTES
app.use('/api/user', userRouter);
app.use('/user', userRouter);

app.use('/api/course', courseRouter);
app.use('/course', courseRouter);

app.use('/api/payment', paymentRouter);
app.use('/api/admin', adminRouter);

// Serve Static Assets & SPA Fallback
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// Root route for API health check
app.get('/', (req, res) => {
    res.send('SkillForge API is running...');
});

// SPA Fallback
app.get(/^(?!\/api).*/, (req, res) => {
    const indexPath = process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, '../frontend/dist/index.html')
        : path.resolve(__dirname, '../frontend/index.html');

    if (!fs.existsSync(indexPath)) {
        return res.send('Frontend not built. Use port 5173 for development.');
    }
    res.sendFile(indexPath);
});

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    });
}

export default app;