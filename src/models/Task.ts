//Interfaces
import mongoose, { Schema, Document, Date} from 'mongoose';
// import User, {IUser} from './User';

//Interfaz para tratar respuesta como documento
export interface ITask extends Document {
    name: string;
    startDate: Date;
    endDate: Date;
    // owner: IUser['_id']; //Relacion con la coleccion courses
    // customer: IUser['_id']; //Relacion con la coleccion courses
}

//Modelo de objeto que se guarda en la BBDD de MongoDB
const taskSchema : any = new Schema({
    name: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: User
    // },
    // customer: {
    //     type: Schema.Types.ObjectId,
    //     ref: User
    // }
});

//Exportamos modelo para poder usarlo
export default mongoose.model<ITask>('Task', taskSchema);