const {
    Router
} = require('express');
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AnnotationController from './app/controllers/AnnotationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);



routes.get('/', function (req, res) {
    res.redirect('/sessions');
})


routes.post('/sessions', SessionController.store);

routes.get('/annotations', authMiddleware, AnnotationController.index);
routes.post('/annotations', authMiddleware, AnnotationController.store);
routes.get('/annotations/:id', authMiddleware, AnnotationController.show);
routes.post('/annotations/:id', authMiddleware, AnnotationController.update);
routes.delete('/annotations/:id', authMiddleware, AnnotationController.delete);

routes.post('/file', upload.single('file'), FileController.store);



export default routes;