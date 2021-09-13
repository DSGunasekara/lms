import express from "express";
import TodoList from '../Models/TodoList.js';

const router = express.Router();

export const createTask = (async (req, res) =>{
    try{
        const { task } = req.body;
        const checkTask = await TodoList.findOne({})
    }catch (error){

    }
})