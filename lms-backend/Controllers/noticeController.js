import express from "express";
import Notice from '../Models/Notice.js'

const router = express.Router();

//get all notices
export const getNotices = (async(req, res)=>{
  try {
    const notices = await Notice.find({})
        .populate({
            path: 'createdBy',
            select: 'name'
        })
    return res.status(200).send(notices);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//get one notice
export const getNotice = (async(req, res)=>{
  try {
    const notice = await Notice.findOne({ _id: req.params.id })
    .populate({
        path: 'createdBy',
        select: 'name'
    })
    if (!notice) return res.status(404).send("Notice does not exits");
    return res.status(200).send(notice);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//create a notice
export const createNotice = (async(req, res)=>{
  try {
    const notice = new Notice({ ...req.body });

    notice.save((error, savedNotice) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send(savedNotice);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//update a notice
export const updateNotice = (async(req, res)=>{
  try {
    const checkNotice = await Notice.findOne({ _id: req.params.id });
    if (!checkNotice) return res.status(404).send("Notice does not exits");

    await Notice.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).send("Notice updated");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//delete Notice
export const deleteNotice = (async(req, res)=>{
  try {
    const notice = await Notice.findOne({ _id: req.params.id });
    if (!notice) return res.status(404).send("Notice does not exits");

    await notice.remove((error, _) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send("Notice deleted");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export default router;