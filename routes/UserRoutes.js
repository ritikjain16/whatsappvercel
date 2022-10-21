import express from "express";
import User from "../schemas/UserSchema.js";
import { mymiddleware } from "../middleware/mymiddleware.js";
const router = express.Router();

router.post("/get", mymiddleware, async (req, res) => {
  const { uid } = req.body;
  try {
    const user = await User.findOne({ uid });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/update/theme", mymiddleware, async (req, res) => {
  const { uid, themecolor } = req.body;
  try {
    const user = await User.updateOne({ uid }, { $set: { themecolor } });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/update/img", mymiddleware, async (req, res) => {
  const { uid, imageRef, image } = req.body;
  try {
    const user = await User.updateOne({ uid }, { $set: { imageRef, image } });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/update/name", mymiddleware, async (req, res) => {
  const { uid, name } = req.body;
  try {
    const user = await User.updateOne({ uid }, { $set: { name } });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/update/firebaseToken", mymiddleware, async (req, res) => {
  const { uid, firebaseToken } = req.body;
  try {
    const user = await User.updateOne({ uid }, { $set: { firebaseToken } });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/update/status", mymiddleware, async (req, res) => {
  const { uid, status } = req.body;
  try {
    const user = await User.updateOne({ uid }, { $set: { status } });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/get/story", mymiddleware, async (req, res) => {
  const { uid, date } = req.body;
  // console.log(req.body);
  try {
    const user = await User.findOne({ uid, "stories.date": parseInt(date) });
    // console.log(user);
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/delete/story", mymiddleware, async (req, res) => {
  const { uid, sid } = req.body;
  try {
    const user = await User.updateOne(
      { uid },
      { $pull: { stories: { sid: parseInt(sid) } } }
    );
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/add/story", mymiddleware, async (req, res) => {
  const { uid, obj } = req.body;
  try {
    const user = await User.updateOne({ uid }, { $push: { stories: obj } });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/add/view", mymiddleware, async (req, res) => {
  const { obj, uid, date } = req.body;
  try {
    const user = await User.updateOne(
      { uid, "stories.sid": parseInt(date) },
      {
        "stories.$": obj,
      }
    );
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/get/allusers", mymiddleware, async (req, res) => {
  try {
    const user = await User.find().sort({ name: 1 });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/create", mymiddleware, async (req, res) => {
  try {
    const finduser = await User.findOne({ uid: req.body.uid });
    if (finduser) {
      res.status(200).send("");
    } else {
      const createuser = await User.create(req.body);
      res.status(200).send(createuser);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

export default router;
