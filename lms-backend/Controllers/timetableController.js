import express from "express";
import Timetable from "../Models/Timetable.js";

const router = express.Router();

// get all timetables
export const getTimetables = async(req, res) => {
    try{
        const timetables = await Timetable.find({});
        return res.status(200).send(timetables);
    }catch (error) {
        return res.status(500).send(error);
    }
}

export const getTimetable = async(req, res) => {
    try{
        const timetable = await Timetable.findById({ _id: req.params.id });
        if(!timetable) return res.status(404).send('Timetable not found')
        return res.status(200).send(timetable);
    }catch (error) {
        return res.status(500).send(error);
    }
}

// create timetable
export const createTimetable = async(req, res) => {
    try {
        const timetable = new Timetable({...req.body});
        timetable.save((error, savedTimetable) => {
            if (error) return res.status(400).send(error);
            return res.status(201).send(savedTimetable);
        });
    }catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

export const deleteTimetable = async(req, res) => {
    try {
        const timetable = await Timetable.findOne({ _id: req.params.id });
        if (!timetable) return res.status(404).send("Timetable does not exits");
        await Timetable.deleteOne({ _id: req.params.id }, (error, _) => {
            if (error) return res.status(400).send(error);
            return res.status(200).send('Timetable deleted');
          });
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const updateTimetable = async(req, res) => {
    try {
        const timetable = await Timetable.findOne({ _id: req.params.id });
        if (!timetable) return res.status(404).send("Timetable does not exits");
        await Timetable.updateOne({ _id: req.params.id }, req.body);
        return res.status(200).send('Timetable updated')
    } catch (error) {
        return res.status(500).send(error)
    }
}

export default router;