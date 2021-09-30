import express from "express";
import Discussion from "../Models/Discussion.js";

const router = express.Router();

//get all discussion topics
export const getDiscussions = (async(req, res) => {
    try {
        const discussions = await Discussion.find({})
            .populate({
                path: 'postedBy',
                select: 'name'
            })
            .populate({
                path: 'replies.postedBy',
                select: 'name'
            })
            .populate({
                path: 'modulename',
                select: 'name'
            })
        return res.status(200).send(discussions);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//get one discussion 
export const getDiscussion = (async(req, res) => {
    try {
        const discussion = await Discussion.findOne({ _id: req.params.id })
            .populate({
                path: 'postedBy',
                select: 'name'
            })
            .populate({
                path: 'replies.postedBy',
                select: 'name'
            })
            .populate({
                path: 'modulename',
                select: 'name'
            })
        if (!discussion) return res.status(404).send("Discussion does not exists");
        return res.status(200).send(discussion);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//create a discussion
export const createDiscussion = (async(req, res) => {
    try {
        const discussion = new Discussion({...req.body });

        discussion.save((error, savedDiscussion) => {
            if (error) return res.status(400).send(error);
            return res.status(200).send(savedDiscussion);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//update a discussion 
export const updateDiscussion = (async(req, res) => {
    try {
        const checkDiscussion = await Discussion.findOne({ _id:req.params.id });
        if (!checkDiscussion) return res.status(404).send("Discussion does not exists");

        await Discussion.updateOne({ _id: req.params.id }, req.body);
        return res.status(200).send("Discussion Updated");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//delete discussion
export const deleteDiscussion = (async(req, res) => {
    try {
        const discussion = await Discussion.findOne({ _id: req.params.id });
        if (!discussion) return res.status(404).send("Discussion does not exist");
        await discussion.remove((error, _) => {
            if (error) return res.status(400).send(error);
            return res.status(200).send("Discussion Deleted");
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

export default router;
