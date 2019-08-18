const express = require("express");
const NewsItem = require("../models/NewsItem");
const auth = require('../middlewares/auth')
const router = new express.Router();

router.get("/news", async (req, res) => {
  const news = await NewsItem.find({});
  news.reverse()
  try {
    res.send(news);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/news", auth, async (req, res) => {
  const newsItem = new NewsItem({
    ...req.body,
    owner: req.user._id
  })

  try {
    await newsItem.save();
    res.status(201).send(newsItem);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch('/news/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'body']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const newsItem = await NewsItem.findById(req.params.id)
      if (!newsItem) {
          return res.status(404).send()
      }

      updates.forEach((update) => newsItem[update] = req.body[update])
        await newsItem.save()
        res.send(newsItem)
  } catch (e) {
      res.status(400).send(e)
  }
})

router.delete('/news/:id', auth, async (req, res) => {
  try {
    const newsItem = await NewsItem.findByIdAndDelete(req.params.id)

    if (!newsItem) {
        return res.status(404).send()
    }

    res.send(newsItem)
} catch (e) {
    res.status(400).send(e)
}
})

module.exports = router;
