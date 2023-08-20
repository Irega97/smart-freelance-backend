//Interfaces
import mongoose, { Schema, Document} from 'mongoose';
import Task, { ITask } from './Task';

//Interfaz para tratar respuesta como documento
export interface IUser extends Document {
    name: string;
    walletAddress: string;
    tasks: ITask['_id']; //Relacion con la coleccion tareas
}

//Modelo de objeto que se guarda en la BBDD de MongoDB
const userSchema = new Schema({
    name: {
        type: String
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: Task
    }],
    walletAddress: {
        type: String
    }
});

//Exportamos modelo para poder usarlo
export default mongoose.model<IUser>('User', userSchema);