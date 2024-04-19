const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const UserNews = require('../models/UserNews');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnews', fetchuser, async (req, res) => {
        try {
            const { author, title, description, url, urlToImage, publishedAt, content  } = req.body;
            const news = new UserNews({
                author, title, description, url, urlToImage, publishedAt, content, user: req.user.id
            })
            const savedNews = await news.save();

            res.json(savedNews);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenews/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let news = await UserNews.findById(req.params.id);
        if (!news) { return res.status(404).send("News not Found") }

        // Allow deletion only if user owns this Note
        if (news.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        news = await UserNews.findByIdAndDelete(req.params.id)
        res.json({ "Success": "News has been deleted", news: news });
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

module.exports = router