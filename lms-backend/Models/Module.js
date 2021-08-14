import mongoose from 'mongoose';

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
  year: {
    type: String,
  },
  semester: {
    type: String
  }
  // lectures: {
  //     type: [{
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Lecture'
  //     }]
  // },
  // labs: {
  //     type: [{
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Lecture'
  //     }]
  // }
});

const Module = mongoose.model("Module", ModuleSchema);

export default Module;