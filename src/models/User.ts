//Interfaces
import mongoose, { Schema, Document} from 'mongoose';
import Task, { ITask } from './Task';
import { EthereumAddress, ethereumAddress } from '../config/domains';

//Interfaz para tratar respuesta como documento
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string | undefined;
    fullName: string | undefined;
    username: string;
    email: string | undefined;
    image: string | undefined;
    walletAddress: EthereumAddress;
    createdTasks: ITask['_id'];
    purchasedTasks: ITask['_id'];
}

//Modelo de objeto que se guarda en la BBDD de MongoDB
const userSchema = new Schema({
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    image: {
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