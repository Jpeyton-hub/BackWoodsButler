import mongoose from 'mongoose';
const { Schema } = mongoose;

const equipmentSchema = new Schema({
    title: String,
    type: String,
    qty: Nummber,
    notes: String
});


module.exports = mongoose.model('Equipment', equipmentSchema);
