import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';

const whiteList = [
  'http://localhost: 3001',
  'http://localhost: 3000',
  'http://35.247.202.181:81',
  'http://35.247.202.181',
  '*',
];

const corsOption = {

  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middewares();
    this.routes();
  }

  middewares() {
    this.app.use(cors(corsOption));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}

export default new App().app;
