import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import ErrorHandler from './middlewares/error-handler.middleware';
import { routes } from './routes';
import { userRoute } from './routes/users.route';
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

app.use(routes);
app.use(userRoute);

app.use(ErrorHandler);

app.listen(port, () =>
  console.log(
    `🚀 API is running at port: 👉 ${port}, processID Node: *️⃣  ${process.pid}`,
  ),
);
