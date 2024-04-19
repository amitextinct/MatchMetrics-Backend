const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
router.put("/:email", async (req, res) => {
	try {
	  const { error } = validate(req.body);
	  if (error)
		return res.status(400).send({ message: error.details[0].message });
  
	  const user = await User.findOne({ email: req.params.email });
	  if (!user)
		return res.status(404).send({ message: "User not found" });
  
	  if (req.body.password) {
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		req.body.password = await bcrypt.hash(req.body.password, salt);
	  }
  
	  await User.findOneAndUpdate({ email: req.params.email }, req.body, { new: true });
  
	  res.status(200).send({ message: "User updated successfully" });
	} catch (error) {
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });

module.exports = router;