import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import cookikeParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './features/auth/routes/auth';
import swaggerJsdoc from 'swagger-jsdoc';
import { authMiddleware } from './shared/middleware/authMiddleware';
import greetRoutes from './features/greet/routes/greet';
import { connectDB } from './shared/config/database';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LearnEx API',
      version: '0.1.0',
      description: 'API documentation for LearnEx',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/features/**/routes/*.ts'], // path to your API routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
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
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
});
