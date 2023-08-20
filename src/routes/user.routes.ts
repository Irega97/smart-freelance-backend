import {Router} from "express"; 
import userController from '../controllers/user.controller'

//Router nos permite gestionar rutas de la API
const router = Router();

//Peticiones HTTP (ruta, función del controlador)
router.get('/user/' /*RUTA*/, userController.getUsers /*FUNCION DEL CONTROLADOR*/);
router.get('/user/:id', userController.getUserById);
router.get('/user/:nombre', userController.getUserByName);
router.post('/user/register', userController.postUserDemo);
router.patch('/user/update/:id', userController.updateUser);
router.delete('/user/delete/:id',userController.deleteUser);
router.delete('/user/delete',userController.deleteAll);

//Exportamos router para usar rutas en app.ts
export default router;