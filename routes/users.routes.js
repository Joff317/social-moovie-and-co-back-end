const router = require("express").Router();
const jwt = require("jsonwebtoken");
const requireAuth = require("../middlewares/requireAuth");
const bcrypt = require("bcrypt");

const User = require("../models/User.model");

// 1. Create User

router.post("/", async (req, res, next) => {
  try {
    const { pseudo, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    const createdUser = await User.create({
      pseudo,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: createdUser._id, email: createdUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );

    res.status(201).json({ message: "User created", token: token });
  } catch (err) {
    next(err);
  }
});

// 2. Read User
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const users = await User.find().select({ email: 1, pseudo: 1 });
    res.status(201).json({
      message: "All user was getting",
      data: users,
    });
  } catch (err) {
    next(err);
  }
});

// 3. Get single User
router.get("/uniqueuser", requireAuth, async (req, res, next) => {
  try {
    const id = req.user._id; // Récupérer l'id de l'user authentifié défini dans le middleware.
    const user = await User.findById(id).select({ email: 1, pseudo: 1 });
    res.status(201).json({
      message: `User with id: ${id} was successfully found`,
      user: user,
    });
  } catch (err) {
    next(err);
  }
});

// 4. Update User
router.put("/:id", requireAuth, async (req, res, next) => {
  const id = req.params.id;
  const { pseudo, email, password } = req.body;
  const updatedUser = { pseudo, email, password };
  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });

    res.status(201).json({
      message: "User updated",
      email: updatedUser.email,
    });
  } catch (err) {
    next(err);
  }
});

// 5. Delete User
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(201).json({ message: `user ${user.email} is deleted` });
  } catch (err) {
    next(err);
  }
});

// 6. Log User
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user === null) {
      throw new Error("Authentification failed");
    }

    const comparePassword = bcrypt.compareSync(password, user.password); // le mot de passe fourni avec la requête est comparé avec le mot de passe haché
    console.log("comparePassword :", comparePassword);
    if (!comparePassword) {
      throw new Error("Authentification failed");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );

    res.status(201).json({ message: "User sign in", token: token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
