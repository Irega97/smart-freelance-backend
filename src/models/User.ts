//Interfaces
import mongoose, { Schema, Document} from 'mongoose';
import Task, { ITask } from './Task';

//Interfaz para tratar respuesta como documento
export interface IUser extends Document {
    name: string;
    fullName: string;
    username: string;
    email: string;
    image: string;
    walletAddress: string;
    createdTasks: ITask['_id'];
    purchasedTasks: ITask['_id'];
}

//Modelo de objeto que se guarda en la BBDD de MongoDB
const userSchema = new Schema({
    name: {
        type: String
    },
    fullName: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
    walletAddress: {
        type: String
    },
    createdTasks: [{
        type: Schema.Types.ObjectId,
        ref: Task
    }],
    purchasedTasks: [{
        type: Schema.Types.ObjectId,
        ref: Task
    }]
});

//Exportamos modelo para poder usarlo
export default mongoose.model<IUser>('User', userSchema);