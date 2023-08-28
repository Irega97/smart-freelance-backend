import {Router} from "express"; 
import paymentsController from '../controllers/payments.controller'

//Router nos permite gestionar rutas de la API
const router = Router();
const path = '/payments';

//Peticiones HTTP (ruta, función del controlador)
router.post(path + '/createWallet', paymentsController.createTemporalWallet);

//Exportamos router para usar rutas en app.ts
export default router;