const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    doctorid: { type: String, required: true },
    patientid: { type: String, default: "" },
    status: { type: String, default: "available" },
    patientName: { type: String, default: "" },
    doctorName: { type: String, required: true },
    patientEmail: { type: String, default: "" },
    paymentPhoto: { type: String, default: "" },
    isConfirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
