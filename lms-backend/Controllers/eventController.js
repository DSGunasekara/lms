import express from "express";
import Event from '../Models/Event.js'

const router = express.Router();

//get all events
export const getEvents = (async(req, res)=>{
  try {
    const events = await Event.find({})
        .populate({
            path: 'createdBy',
            select: 'name'
        })
    return res.status(200).send(events);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//get one event
export const getEvent = (async(req, res)=>{
  try {
    const event = await Event.findOne({ _id: req.params.id })
    .populate({
        path: 'createdBy',
        select: 'name'
    })
    if (!event) return res.status(404).send("Event does not exits");
    return res.status(200).send(event);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//create an event
export const createEvent = (async(req, res)=>{
  try {
    const event = new Event({ ...req.body });

    event.save((error, savedEvent) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send(savedEvent);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//update an event
export const updateEvent = (async(req, res)=>{
  try {
    const checkEvent = await Event.findOne({ _id: req.params.id });
    if (!checkEvent) return res.status(404).send("Event does not exits");

    await Event.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).send("Event updated");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//delete event
export const deleteEvent = (async(req, res)=>{
  try {
    const event = await Event.findOne({ _id: req.params.id });
    if (!event) return res.status(404).send("Event does not exits");

    await event.remove((error, _) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send("Event deleted");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export default router;