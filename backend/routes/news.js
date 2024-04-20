const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fetchuser = require('../middleware/fetchuser');
const UserNews = require('../models/UserNews');

router.get('/fetchallnews', fetchuser, async (req, res) => {
    try {
        const news = await UserNews.find({ user: req.user.id });
        res.json(news);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/news/addnews". Login required
router.post('/addnews', fetchuser, async (req, res) => {
    try {
        const { author, title, description, url, urlToImage, publishedAt, content } = req.body;

        const news_id = await crypto.createHash('md5').update(title).digest('hex');

        let newsItem = await UserNews.find({ news_id: news_id, user: req.user.id });
        if (newsItem.length > 0) {
            return res.status(400).json({ status: 400, results: "Please do not send duplicate requests" });
        }

        const news = new UserNews({
            news_id, author, title, description, url, urlToImage, publishedAt, content, user: req.user.id
        })
        const savedNews = await news.save();

        res.json({ status: 200, results: savedNews });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing news using: DELETE "/api/news/deletenews". Login required
router.delete('/deletenews/:id', fetchuser, async (req, res) => {
    try {
        // Find the news to be delete and delete it
        let news = await UserNews.findById(req.params.id);
        if (!news) { 
            return res.status(404).json({status:404, message: "News not Found"}) 
        }

        // Allow deletion only if user owns this Note because it checks the user id from the JWT and the database entry
        if (news.user.toString() !== req.user.id) {
            return res.status(400).json({status:400, message: "Not Allowed"});
        }

        news = await UserNews.findByIdAndDelete(req.params.id)
        return res.json({ status: 200, message: "News has been deleted", news: news });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router