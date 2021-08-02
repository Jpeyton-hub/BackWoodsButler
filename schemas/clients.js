import mongoose from 'mongoose';
const { Schema } = mongoose;

const clientSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    notes: String
});

module.exports = mongoose.model('Client', clientSchema);