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
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        ref: "User"
    },
    replies: [{
        text: String,
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
        createdAt: { type: Date, default: new Date() }
    }]
});

const Discussion = mongoose.model('Discussion', DiscussionSchema);

export default Discussion;