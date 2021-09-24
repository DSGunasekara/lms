import mongoose from 'mongoose';


const DiscussionSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }, 
});

const Discussion = mongoose.model('Discussion', DiscussionSchema);

export default Discussion;