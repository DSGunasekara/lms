import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

const Notice = mongoose.model('Notice', NoticeSchema);

export default Notice;
