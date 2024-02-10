const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  pseudo: {
    type: String,
    required: [true, "Le pseudo doit-être rempli."],
    unique: [true, "Le pseudo est déjà utilisé."],
  },

  email: {
    type: String,
    required: [true, "L'email est obligatoire."],
    unique: [true, "l'email est déjà utilisé."],
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "Format d'adresse email invalide.",
    },
  },

  password: {
    type: String,
    required: [true, "Le mot de passe est obligatoire."],
  },
  //   validate: {
  //     validator: function (value) {
  //       return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/.test(value);
  //     },
  //     message:
  //       "Le mot de passe doit contenir 8 caractères dont une majuscule, un chiffre et un caractère spécial.",
  //   },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Commentary",
    },
  ],
});

const User = model("User", userSchema);
module.exports = User;
