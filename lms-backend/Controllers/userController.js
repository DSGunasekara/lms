import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import idGenerator from "../Services/idGenerator.js";

const router = express.Router();

//get all users
export const getUsers = (async(req, res)=>{
  try {
    const users = await User.find({})
      .select("-password")
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//get one user
export const getUser = (async(req, res)=>{
  try {
    const user = await User.findOne({ _id: req.params.id })
      .select("-password")
    if (!user) return res.status(404).send("User does not exits");
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//create a user
export const createUser = (async(req, res)=>{
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) return res.status(409).send("User already exits");
    const id = await idGenerator(req.body.role);

    const user = new User({ regNumber: id, ...req.body });

    //hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.save((error, savedUser) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send(savedUser);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//update a user
export const updateUser = (async(req, res)=>{
  try {
    const checkUser = await User.findOne({ _id: req.params.id });
    if (!checkUser) return res.status(404).send("User does not exits");

    await User.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).send("User updated");
  } catch (error) {
    return res.status(500).send(error);
  }
});

//update Password
export const updatePassword = (async(req, res)=>{
  try {
    const oldPass = req.body.oldPassword;
    const newPass = req.body.password;
    
    const found_user = await User.findOne({ _id: req.body.id });
    if (!found_user) return res.status(404).send("No user found");
    
    const isMatch = await bcrypt.compare(oldPass, found_user.password);
    
    if (!isMatch) return res.status(401).send("Old Password is incorrect");
    
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const enPass = await bcrypt.hash(newPass, salt);
      found_user.password = enPass;
    }
    
    found_user.save((err, _) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.status(200).send("Password Update Success");
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

//delete user
export const deleteUser = (async(req, res)=>{
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(404).send("User does not exits");

    await user.remove((error, _) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send("User deleted");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export const updateProfilePicture = (async(req, res) => {
  try {
    if (req.file.path) {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(404).send("User does not exits");
      user.profile_photo = req.file.path;
      await User.updateOne({ _id: req.params.id }, user);
      return res.status(200).send('Profile Updated');
    } else {
      return res.status(400).send('Profile Update Error')
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
})

export default router;