import express from "express";
import Chat from "../schemas/ChatSchema.js";
import { mymiddleware } from "../middleware/mymiddleware.js";
const router = express.Router();

router.post("/get",mymiddleware, async (req, res) => {
  const { docid } = req.body;
  try {
    const user = await Chat.findOne({ docid });
    // console.log(user);
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/update/uids",mymiddleware, async (req, res) => {
  const { docid, uid1, uid2 } = req.body;
  try {
    const findchat = await Chat.findOne({ docid });
    if (findchat) {
      // const user = await Chat.updateOne({ docid }, { $set: { uid1, uid2 } });
      res.status(200).send({ user: "" });
    } else {
      const user = await Chat.create({
        docid,
        uid1,
        uid2,
        messages: [],
        chatbg: "",
        chatbgref: "",
      });
      res.status(200).send(user);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/add/message",mymiddleware, async (req, res) => {
  const { docid, obj } = req.body;
  try {
    const chat = await Chat.updateOne({ docid }, { $push: { messages: obj } });
    res.status(200).send(chat);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/delete/message",mymiddleware, async (req, res) => {
  const { docid, messid } = req.body;
  try {
    const chat = await Chat.updateOne(
      { docid },
      { $pull: { messages: { _id: messid } } }
    );
    res.status(200).send(chat);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/update/uid1",mymiddleware, async (req, res) => {
  const { docid, uid1 } = req.body;
  try {
    const user = await Chat.updateOne({ docid }, { $set: { uid1 } });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/update/uid2",mymiddleware, async (req, res) => {
  const { docid, uid2 } = req.body;
  try {
    const user = await Chat.updateOne({ docid }, { $set: { uid2 } });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/update/chatbg",mymiddleware, async (req, res) => {
  const { docid, chatbg, chatbgref } = req.body;
  try {
    const user = await Chat.updateOne(
      { docid },
      { $set: { chatbg, chatbgref } }
    );
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/remove/bg",mymiddleware, async (req, res) => {
  const { docid, chatbg, chatbgref } = req.body;
  try {
    const user = await Chat.updateOne(
      { docid },
      { $set: { chatbg, chatbgref } }
    );
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

export default router;
