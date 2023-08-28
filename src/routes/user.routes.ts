import {Router} from "express"; 
import userController from '../controllers/user.controller'

//Router nos permite gestionar rutas de la API
const router = Router();
const path = '/user';

router.get(path + '/:walletAddress', userController.getUserByWallet);
router.get(path + '/:walletAddress/tasks', userController.getUserTasksByWallet);
router.post(path + '/new', userController.postUser);
router.delete(path + '/delete/:walletAddress',userController.deleteUser);

//Exportamos router para usar rutas en app.ts
export default router;