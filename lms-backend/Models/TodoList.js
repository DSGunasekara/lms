import mongoose from "mongoose";

const TodoListSchema = new mongoose.Schema({

    CreatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
      },

      todo:{
        items:[
            {
                name:{
                    type:String,
                    required: true
                }
            }
        ]
      },

      in_progress:{
        items:[
            {
                name:{
                    type:String,
                    required: true
                }
            }
        ]
      },

      done:{
        items:[
            {
                name:{
                    type:String,
                    required: true
                }
            }
        ]
      }
})

const Todo = mongoose.model('TodoList', TodoListSchema);

export default Todo;