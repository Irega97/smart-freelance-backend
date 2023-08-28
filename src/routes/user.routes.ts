import {Router} from "express"; 
import userController from '../controllers/user.controller'

//Router nos permite gestionar rutas de la API
const router = Router();
const path = '/user';

//Peticiones HTTP (ruta, función del controlador)
// router.get('/user/', userController.getUsers);
router.get(path + '/:walletAddress', userController.getUserByWallet);
// router.get('/user/id/:id', userController.getUserById);
router.post(path + '/new', userController.postUser);
// router.patch('/user/update/:id', userController.updateUser);
router.delete(path + '/delete/:walletAddress',userController.deleteUser);
// router.delete('/user/delete',userController.deleteAll);

//Exportamos router para usar rutas en app.ts
export default router;