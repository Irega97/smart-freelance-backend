import mongoose, { Schema, Document } from 'mongoose';
import { TaskStatus } from '../config/domains';
import { IUser } from './User';
import { IServiceContract } from './ServiceContract';

export interface ITask extends Document {
    _id: mongoose.Types.ObjectId;
    // taskNumber: number; AUTONUMBER TSK-{000000000}
    name: string; // Task name
    owner: IUser['_id']; // User that creates the task
    contracts: IServiceContract['_id']; // Contracts related to the task
    status: TaskStatus; // Task status (default "New")
    description: string; // Task description
}

const taskSchema: Schema = new Schema({
    // taskNumber: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
        ref: 'User'
    },
    contracts: {
        type: String,
        ref: 'ServiceContract'
    },
    status: {
        type: String,
        default: 'New'
    },
    description: {
        type: String
    },
});

// const AutoIncrementFactory = require('mongoose-sequence')(mongoose);

// taskSchema.plugin(AutoIncrementFactory, {
//     id: 'task_number_seq',
//     inc_field: 'taskNumber',
//     reference_fields: ['taskNumber'],
//     format: 'TSK-{{#formatNumber taskNumber "000000000"}}'
// });

export default mongoose.model<ITask>('Task', taskSchema);
