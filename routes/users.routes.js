const router = require("express").Router();
const jwt = require("jsonwebtoken");
const requireAuth = require("../middleware/requireAuth");
const bcrypt = require("bcrypt");

const User = require("../models/Users.model");
