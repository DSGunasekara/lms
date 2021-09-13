import mongoose from "mongoose";

const TodoListSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    toDoState:{

    }
})