import {Router} from "express"; 
import tasksController from '../controllers/tasks.controller'

//Router nos permite gestionar rutas de la API
const router = Router();
const path = '/tasks';

router.get(path + '/', tasksController.getAllTasks);
router.get(path + '/:id', tasksController.getTask);
router.post(path + '/new', tasksController.createTask);
router.delete(path + '/delete/:id', tasksController.deleteTask);

//Exportamos router para usar rutas en app.ts
export default router;