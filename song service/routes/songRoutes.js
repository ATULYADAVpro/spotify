import { Router } from 'express'
import songController from '../controllers/songController.js';
const songRouter = Router();

songRouter.get('/album/all', songController.getAllAlbum)
songRouter.get('/album/:id', songController.getAllSongsOfAlbum)
songRouter.get('/song/all', songController.getAllSongs)
songRouter.get('/song/:id', songController.getSingleSongs)

export default songRouter;