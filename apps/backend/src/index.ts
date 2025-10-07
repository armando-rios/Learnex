import express from 'express';
import cors from 'cors';
import cookikeParser from 'cookie-parser';
import { databaseConnection } from '@/shared/database';
import authRoutes from './features/auth/routes/auth';
import { authMiddleware } from './shared/middleware/authMiddleware';
import greetRoutes from './features/greet/routes/greet';

const PORT = process.env.PORT || 3000;
const app = express();

databaseConnection.connect();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true, // Allow cookies to be sent
  }),
);
app.use(cookikeParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(authMiddleware);
app.use('/api/greet', greetRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
