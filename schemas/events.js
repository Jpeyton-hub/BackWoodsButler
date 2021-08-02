import mongoose from 'mongoose';
const { Schema } = mongoose;


const eventSchema = new Schema({
    title: String,
    date: { type : Date, default : Date.now },
    clientID: ObjectId,
    equipment: Array,
    duration: Number,
    location: String,
    completed: { Type : Boolean, default: false}
});

module.exports = mongoose.model('Event', eventSchema);