import mongoose from 'mongoose';

const lecture = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    week: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
    },
    description: {
        type: String,
    },
})

const ModuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  module_code: {
    type: String,
    required: true,
    unique: true,
  },
  lecture_in_charge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lab_assistant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lectures: {
      type: [lecture]
  },
  labs: {
      type: [lecture]
  }
});

const User = mongoose.model("Module", ModuleSchema);

export default User;