import express from "express";
import TodoList from '../Models/TodoList.js';

const router = express.Router();

export const createTask = (async (req, res) =>{

    try{
        const todo = new TodoList({...req.body});

        todo.save((error, savedTodo) => {
            if (error) return res.status(400).send(error);
            return res.status(200).send(savedTodo);
          });
    }catch (error){
        console.log(error);
        return res.status(500).send(error);
    }
});

export const getTask = (async (req, res) =>{
    try{
        const todo = await TodoList.findOne({ _id: req.params.id })
        .populate({
            path: 'CreatedBy',
            select: 'name'
        })
        if (!todo) return res.status(404).send("Todo does not exits");
        return res.status(200).send(todo);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

export const getTasks = (async(req, res) =>{

    try{
        const todos = await TodoLists.find({ })
        .populate({
            path: 'CreatedBy',
            select: 'name'
        })
        return res.status(200).send(todos);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})