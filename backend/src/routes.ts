import { Router } from 'express';
import multer from 'multer';

import UserController from './controllers/UserController';

import OrphanagesController from './controllers/OrphanagesController';
import uploadConfig from './config/upload';

import authMiddlware from './middleware/authmiddlware';

import ManipuleController from './controllers/ManipuleController';

const routes = Router()
const upload = multer(uploadConfig)

//App routes
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images') ,OrphanagesController.create);

//Authenticate routes
routes.post('/register', UserController.store);
routes.post('/login', UserController.Authenticate);

//Authenticated Routes
routes.get('/dashboard', authMiddlware , ManipuleController.show);
routes.delete('/dashboard/delete/:id', authMiddlware, ManipuleController.delete);
routes.get('/manipule/:id', authMiddlware, ManipuleController.index);
routes.put('/edit/:id', authMiddlware, ManipuleController.edit);

export default routes