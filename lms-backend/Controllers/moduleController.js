import express from "express";
import User from "../Models/User.js";
import Module from '../Models/Module.js'

const router = express.Router();

//get all modules
export const getModules = (async(req, res)=>{
  try {
    const courseModules = await Module.find({})
        .populate({
            path: 'lecture_in_charge',
            select: 'name'
        })
        .populate({
            path: 'lab_assistant',
            select: 'name'
        })
    return res.status(200).send(courseModules);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//get one module
export const getModule = (async(req, res)=>{
  try {
    const courseModules = await Module.findOne({ _id: req.params.id })
    .populate({
        path: 'lecture_in_charge',
        select: 'name'
    })
    .populate({
        path: 'lab_assistant',
        select: 'name'
    })
    if (!courseModules) return res.status(404).send("Module does not exits");
    return res.status(200).send(courseModules);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//create a module
export const createUser = (async(req, res)=>{
  try {
    const { module_code } = req.body;
    const checkModule = await Module.findOne({ module_code });
    if (checkModule) return res.status(409).send("Module already exits");

    const courseModules = new Module({ ...req.body });

    courseModules.save((error, savedModule) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send(savedModule);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//update a module
export const updateModule = (async(req, res)=>{
  try {
    const checkModule = await Module.findOne({ _id: req.params.id });
    if (!checkModule) return res.status(404).send("Module does not exits");

    await Module.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).send("Module updated");
  } catch (error) {
    return res.status(500).send(error);
  }
});

//delete module
export const deleteModule = (async(req, res)=>{
  try {
    const courseModules = await Module.findOne({ _id: req.params.id });
    if (!courseModules) return res.status(404).send("Module does not exits");

    await courseModules.remove((error, _) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send("Module deleted");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export default router;