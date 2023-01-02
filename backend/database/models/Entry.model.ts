import mongoose, {Model, Schema} from 'mongoose';
import { IEntry } from '../../../src/interfaces';

export interface BEntry extends IEntry {}

const EntrySchema = new Schema({
    description: {
        type: String,
        require: true
    },
    createdAt: {
        type: Number
    },
    status: {
        type: String,
        enum:{
            values:['pending', 'in-progress', 'finished'],
            message: '{VALUE} no es un status permitido'
        },
        default: 'pending'
    },
});

const EntryModel: Model<BEntry> = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);

export default EntryModel;