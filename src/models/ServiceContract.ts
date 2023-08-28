//Interfaces
import mongoose, { Schema, Document, Date} from 'mongoose';
import User, {IUser} from './User';
import { EthereumAddress, ServiceContractStatus } from '../config/domains';

//Interfaz para tratar respuesta como documento
export interface IServiceContract extends Document {
    _id: mongoose.Types.ObjectId;
    contractNumber: string; //AUTONUMBER
    walletAddress: EthereumAddress; //BILLETERA CREADA POR EL SMART CONTRACT
    contractId: string; //HASH DE LA TRANSACCIÓN DE CREACIÓN DE LA BILLETERA
    provider: IUser['_id']; //Relacion con user.createdTasks
    customer: IUser['_id']; //Relacion con user.purchasedTasks
    status: ServiceContractStatus; //Estado del contrato    
    createdDate: Date; //Fecha de creación del contrato
    closeDate: Date; //Fecha en que se cierra el contrato y se liberan los fondos
}

//Modelo de objeto que se guarda en la BBDD de MongoDB
const servContractSchema : any = new Schema({
    contractNumber: {
        type: String,
        required: true,
        unique: true
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    contractId: {
        type: String,
        required: true,
        unique: true
    },
    provider: {
        type: String,
        ref: 'User',
        required: true
    },
    customer: {
        type: String,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'New'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    closeDate: {
        type: Date
    }
});

//Exportamos modelo para poder usarlo
export default mongoose.model<IServiceContract>('ServiceContract', servContractSchema);