import express from "express";
import Results from '../Models/Results.js'
import Module from '../Models/Module.js'

const router = express.Router();

//get all results
export const getResults = (async(req, res)=>{
  try {
    const results = await Results.find({})
        .populate({
            path: 'students.student',
            select: 'name'
        })
        .populate({
            path: "module"
        })
    return res.status(200).send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//get one result
export const getResult = (async(req, res)=>{
  try {
    const result = await Results.findOne({ _id: req.params.id })
    .populate({
        path: 'students.student',
        select: 'name'
    })
    .populate({
        path: "module"
    })
    if (!result) return res.status(404).send("Result does not exits");
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//create a result
export const createResult = (async(req, res)=>{
  try {
    const {module} = req.body;
    const checkModule = await Module.findById({_id: module});
    if (!checkModule) return res.status(404).send("Module not found")
    const result = new Results({ ...req.body });

    result.save((error, savedResult) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send(savedResult);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//update a result
export const updateResult = (async(req, res)=>{
  try {
    const checkResult = await Results.findOne({ _id: req.params.id });
    if (!checkResult) return res.status(404).send("Result does not exits");

    await Results.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).send("Result updated");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//delete result
export const deleteResult = (async(req, res)=>{
  try {
    const result = await Results.findOne({ _id: req.params.id });
    if (!result) return res.status(404).send("Result does not exits");

    await result.remove((error, _) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send("Result deleted");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export default router;