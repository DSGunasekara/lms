import express from "express";
import Reply from '../Models/Reply.js';

const router = express.Router();

//get all replies
export const getReplies = (async(req, res) => {
    try {
        const replies = await Reply.find({})
            .populate({
                path: 'createdBy',
                select: 'name'
            })
        return res.status(200).send(replies);
    } catch (error) {
        console.log(error);
        return res.status(500).select(error);
    }
});

//get single reply
export const getReply = (async(req, res) => {
    try {
        const reply = await Reply.findOne({ _id: req.params.id })
            .populate({
                path: 'createdBy',
                select: 'name'
            })
            if 
                (!reply) return res.status(404).send("Reply does not exist");
            else 
                return res.status(200).send(reply);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//create reply
export const createReply = (async(req, res) => {
    try {
        const reply = new Reply({ ...req.body });

        reply.save((error, savedReply) => {
            if (error) return res.status(400).send(error);
            return res.status(200).send(savedReply);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//update a reply
export const updateReply = (async(req, res) => {
    try {
        const checkReply = await Reply.findOne({ _id:req.params.id });
        if (!checkReply) return res.status(404).send("Reply does not exist");

        await Reply.updateOne({ _id: req.params.id }, req.body);
        return res.status(200).send("Reply Updated");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//delete reply
export const deleteReply = (async(req, res) => {
    try {
        const reply = await Reply.findOne({ _id: req.params.id });
        if (!reply) return res.status(404).send("Reply does not exist");
        await reply.remove((error, _) => {
            if (error) return res.status(400).send(error);
            return res.status(200).send("Reply Deleted");
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

export default router;