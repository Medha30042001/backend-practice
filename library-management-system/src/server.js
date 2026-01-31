import express from "express";
import "dotenv/config";
import memberRoutes from './routes/member.routes.js';
import bookRoutes from './routes/book.routes.js';
import borrowingRoutes from './routes/borrowing.route.js';
import reportRoutes from './routes/report.routes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('src/public'));

app.use('/members', memberRoutes);
app.use('/books', bookRoutes);
app.use('/borrow', borrowingRoutes);
app.use('/reports', reportRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
