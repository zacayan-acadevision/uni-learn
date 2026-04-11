import { PrismaClient } from '@prisma/client';
import express from 'express';
import app from './app.js';
import landingRouter from './routes/landing.js';

app.use('/', landingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin Panel available at http://localhost:${PORT}/admin`);
});
