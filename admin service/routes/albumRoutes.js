import express, { Router } from 'express'
import isAuth from '../middlewares/isAuth.js';
import albumController from '../controllers/albumController.js';
import uploadFile from '../middlewares/uploadfileMulter.js';
const albumRouter = Router();


albumRouter.post('/album/new', isAuth, uploadFile, albumController.addAlbum);
albumRouter.post('/song/new', isAuth, uploadFile, albumController.addSong);
albumRouter.post('/song/:id', isAuth, uploadFile, albumController.addThumbnail);
albumRouter.delete('/album/:id', isAuth, uploadFile, albumController.deleteAlbum);
albumRouter.post('/song/:id', isAuth, uploadFile, albumController.deleteSong);

export default albumRouter