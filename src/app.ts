import express from 'express';
import errorHandler from './middlewares/error';
import carRouter from './Routes/CarRoute';

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use(carRouter);

export default app;
