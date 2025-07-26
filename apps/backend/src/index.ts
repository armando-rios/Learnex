import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import authRoutes from './features/auth/routes/auth';
import { authMiddleware } from './shared/middleware/authMiddleware';
import getRoutes from './features/greet/routes/greet';
import { connectDB } from './shared/config/database';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(authMiddleware);
app.use('/api/get', getRoutes);

app.listen(PORT, () => console.log(`✅ Server is running on port ${PORT}`));
