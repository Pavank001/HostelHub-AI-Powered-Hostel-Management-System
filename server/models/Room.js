const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },

    floor: {
      type: Number,
      required: true,
    },

    hostelBlock: {
      type: String,
      required: true,
    },

    roomType: {
      type: String,
      enum: ["Single", "Double", "Triple"],
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    occupiedBeds: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Available", "Full", "Maintenance"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);