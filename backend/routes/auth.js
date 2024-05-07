const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

// JWT secret for signing the JWT token
const JWT_SECRET = 'Ayan$patel';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
	body('name', 'Enter a valid name').isLength({ min: 3 }),
	body('email', 'Enter a valid email').isEmail(),
	body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
	let success = false;
	// If there are errors, return Bad request and the errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		success = false;
		return res.status(400).json({ success, error: "Enter Valid Credentials" });
	}
	try {
		// Check whether the user with this email exists already
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			success = false;
			return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
		}

		// Generate a salt for creating a password hash
		const salt = await bcrypt.genSalt(10);
		const secPass = await bcrypt.hash(req.body.password, salt);

		// Create a new user
		user = await User.create({
			name: req.body.name,
			password: secPass,
			email: req.body.email,
		});
		const data = {
			user: {
				id: user.id // This is the id of the mongo document
			}
		};
		const authtoken = jwt.sign(data, JWT_SECRET);
		success = true;
		res.json({ success, authtoken });

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
	body('email', 'Enter a valid email').isEmail(),
	body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
	let success = false;
	// If there are errors, return Bad request and the errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ success, error: "Enter Valid Credentials" });
	}

	const { email, password } = req.body;
	try {
		// Check if the user Exists
		let user = await User.findOne({ email });
		if (!user) {
			success = false;
			return res.status(400).json({ success, error: "User does not exists" });
		}

		// Check for the password similarity
		const passwordCompare = await bcrypt.compare(password, user.password);
		if (!passwordCompare) {
			success = false;
			return res.status(400).json({ success, error: "Incorrect Password" });
		}

		const data = {
			user: {
				id: user.id // This is the id of the mongo document
			}
		};
		const authtoken = jwt.sign(data, JWT_SECRET);
		success = true;
		res.json({ success, authtoken });

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
	try {
		userId = req.user.id;
		// return the user excluding the password field
		const user = await User.findById(userId).select("-password");
		res.send(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})
module.exports = router