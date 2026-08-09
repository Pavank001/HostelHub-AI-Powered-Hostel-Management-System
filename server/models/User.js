const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "warden", "student"],
      default: "student",
    },

    phone: {
      type: String,
    },

    profileImage: {
      type: String,
      default: "",
    },
    room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    default: null,
},

rollNumber: {
    type: String,
    unique: true,
    sparse: true,
},

department: {
    type: String,
},

year: {
    type: Number,
},

guardianName: {
    type: String,
},

guardianPhone: {
    type: String,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);