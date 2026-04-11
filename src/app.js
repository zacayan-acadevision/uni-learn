import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import landingRouter from './routes/landing.js';
import errorRouter from './routes/errorRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import apiRouter from './routes/api.js';
import uniRouter from './routes/uni/uni.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', landingRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('/uni', uniRouter);//
app.use(errorRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Internal Server Error' });
});

export default app;
