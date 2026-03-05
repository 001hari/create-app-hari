import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import errorHandler from './middlewares/error.middleware';
import routes from './routes/index';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Application = express();

// Set security HTTP headers
app.use(helmet());

// Developer logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cookieParser());
// Body parser, reading data from body into req.body
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount API routes
app.use('/api', routes);

// Global error handler
app.use(errorHandler);

export default app;
