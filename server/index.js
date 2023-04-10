const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const http = require("http");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();
require("./db/conn");
const LogindataSchema = require("./models/LogindataSchema");
const DoctorLogindataSchema = require("./models/DoctorLogindataSchema");
const Appointment = require("./models/Appointment");
const moment = require("moment-timezone");

const saltrounds = 10;
const PORT = process.env.PORT || 8000;
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(express.static("uploads"));
var ip = require("ip");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/register", async (req, res) => {
  try {
    const existuser = await LogindataSchema.findOne({ email: req.body.email });
    if (existuser) {
      res.status(200).send({ message: "user already exist", success: false });
    }
    const existphone = await LogindataSchema.findOne({ phone: req.body.phone });
    if (existphone) {
      res.status(200).send({ message: "phone already exist", success: false });
    }
    if (!existuser && !existphone) {
      const hashpwd = await bcrypt.hash(req.body.password, saltrounds);
      const newuser = new LogindataSchema({
        username: req.body.username,
        email: req.body.email,
        password: hashpwd,
        gender: req.body.gender,
        age: req.body.age,
        district: req.body.district,
        phone: req.body.phone,
        youare: req.body.youare,
      });
      await newuser.save();
      console.log(
        `Action Signup By ${req.body.username} From ${
          req.body.district
        } As ${req.body.youare.toUpperCase()}`
      );
      res.status(200).send({ message: "signup success", success: true });
    }
  } catch (err) {
    console.log(err);
    res.status(200).send({ message: "signup error", success: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await LogindataSchema.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).send({ message: "user not found", success: false });
    } else {
      const ispasswordmatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!ispasswordmatch) {
        res
          .status(200)
          .send({ message: "password dont match", success: false });
      } else if (user && ispasswordmatch) {
        res.status(200).send({
          message: "login success",
          success: true,
          role: user.youare,
          id: user._id,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/doctorlogin", async (req, res) => {
  try {
    const doctor = await DoctorLogindataSchema.findOne({
      email: req.body.email,
    });
    if (!doctor) {
      res.status(200).send({ message: "user not found", success: false });
    } else {
      const ispasswordmatch = await bcrypt.compare(
        req.body.password,
        doctor.password
      );

      if (!ispasswordmatch) {
        res
          .status(200)
          .send({ message: "password dont match", success: false });
      } else if (doctor && ispasswordmatch) {
        if (doctor.condition === "Active") {
          res
            .status(200)
            .send({ message: "login success", id: doctor._id, success: true });
        } else {
          res
            .status(200)
            .send({ message: "Your verification pending", success: false });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/admin-dashboard", async (req, res) => {
  try {
    const patientnumber = await LogindataSchema.count({ youare: "patient" });
    const doctornumber = await DoctorLogindataSchema.count({
      condition: "Active",
    });
    const patientdetails = await LogindataSchema.find({ youare: "patient" });
    const doctordetails = await DoctorLogindataSchema.find({
      condition: "Active",
    });
    if (!patientdetails && !doctordetails) {
      res.status(200).send({ message: "Kei ni bhetina", success: false });
    } else {
      res.status(200).send({
        message: "retrieving data",
        doctordetails,
        patientdetails,
        patientnumber,
        doctornumber,
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).send({ message: "Internal error", success: false });
  }
});
app.get("/get-doctor-details", async (req, res) => {
  try {
    const doctordetails = await DoctorLogindataSchema.find({
      condition: "Active",
    });
    if (!doctordetails) {
      res.status(200).send({ message: "Kei ni bhetina", success: false });
    } else {
      res.status(200).send({
        message: "retrieving data",
        doctordetails,
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).send({ message: "Internal error", success: false });
  }
});

app.get("/patient-dashboard/:id", async (req, res) => {
  try {
    const patient = await LogindataSchema.findOne({ _id: req.params.id });

    if (patient) {
      const name = patient.username;
      const email = patient.email;
      const age = patient.age;
      const address = patient.district;
      const gender = patient.gender;
      res
        .status(200)
        .send({ message: "user found", name, email, age, address, gender });
    } else {
      res.status(200).send({ message: "not found name" });
    }
  } catch (err) {
    res.status(200).send({ message: "internal error", success: false });
  }
});
app.get("/doctor-dashboard/:id", async (req, res) => {
  try {
    const patient = await DoctorLogindataSchema.findOne({ _id: req.params.id });
    if (patient) {
      // const t1= `${patient.date}T${patient.timing1}:00.000Z`
      const name = patient.name;
      const email = patient.email;
      const age = patient.age;
      const address = patient.address;
      const gender = patient.gender;
      const photo = patient.profilePhoto;
      const timing1 = patient.timing1;
      const timing2 = patient.timing2;
      const date = patient.date;

      res.status(200).send({
        message: "user found",
        name,
        timing1,
        timing2,
        date,
        photo,
        email,
        age,
        address,
        gender,
      });
    } else {
      res.status(200).send({ message: "not found name" });
    }
  } catch (err) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.delete("/admin-dashboard/:id", async (req, res) => {
  try {
    const usertobedeleted = await LogindataSchema.findOne({
      _id: req.params.id,
    });

    if (usertobedeleted) {
      await LogindataSchema.deleteOne({ _id: req.params.id });
      res.status(200).send({
        message: `user deleted : ${usertobedeleted.username}`,
        success: true,
      });
      return;
    }
    if (!usertobedeleted) {
      const doctordelete = await DoctorLogindataSchema.findOne({
        _id: req.params.id,
      });
      if (doctordelete) {
        await DoctorLogindataSchema.deleteOne({ _id: req.params.id });
        res.status(200).send({
          message: `user deleted : ${doctordelete.name}`,
          success: true,
        });
        return;
      }
    }
  } catch (err) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.post("/doctor-dashboard/timing/:id", async (req, res) => {
  try {
    const finddoctor = await DoctorLogindataSchema.findOne({
      _id: req.params.id,
    });
    if (finddoctor) {
      await DoctorLogindataSchema.updateOne(
        { _id: req.params.id },
        { $set: { timing1: req.body.timing1 } }
      );
      await DoctorLogindataSchema.updateOne(
        { _id: req.params.id },
        { $set: { timing2: req.body.timing2 } }
      );
      await DoctorLogindataSchema.updateOne(
        { _id: req.params.id },
        { $set: { date: req.body.date } }
      );

      const startTime = moment.utc(
        `${req.body.date} ${req.body.timing1}`,
        "YYYY-MM-DD HH:mm"
      );
      const endTime = moment.utc(
        `${req.body.date} ${req.body.timing2}`,
        "YYYY-MM-DD HH:mm"
      );

      const interval = 30; // interval in minutes
      const slots = [];

      let current = moment(startTime);

      while (current.isBefore(endTime)) {
        const slot = {
          date: current.format("YYYY-MM-DD"),
          time: current.format("HH:mm"),
          doctorid: req.params.id,
          status: "available",
          doctorName: finddoctor.name,
        };
        slots.push(slot);

        current.add(interval, "minutes");
      }

      await Appointment.insertMany(slots);
    }
    res.status(200).send({ message: "done" });
  } catch (err) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.post("/book-now/:id1/:id", async (req, res) => {
  try {
    const doctor = await DoctorLogindataSchema.findOne({ _id: req.params.id1 });
    const date1 = req.body.date + "T00:00:00.000+00:00";
    const patient = await LogindataSchema.findOne({ _id: req.params.id });
    if (patient) {
      const query = {
        doctorid: req.params.id1,
        time: req.body.t1,
        date: date1,
      };
      const update = {
        $set: {
          status: "unavailable",
          patientName: patient.username,
          patientid: patient._id,
        },
      };
      await Appointment.findOneAndUpdate(query, update, {
        returnOriginal: false,
      });
      res.status(200).send({
        message: `Booking succes to doctor ${doctor.name} for date ${req.body.date} at ${req.body.t1}`,
      });
    }
  } catch (error) {
    res
      .status(200)
      .send({ message: " second internal error", success: false, error });
  }
});

app.get("/admin-appointment-info", async (req, res) => {
  try {
    const adminappointmentinfo = await Appointment.find({
      patientid: { $exists: true, $ne: "" },
    });
    if (adminappointmentinfo) {
      res
        .status(200)
        .send({ message: "done", adminappointmentinfo, success: true });
    }
  } catch (error) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.get("/patient-appointment-info/:id", async (req, res) => {
  try {
    const data = await Appointment.find({
      patientid: req.params.id,
    });
    if (data) {
      res.status(200).send({ message: "done", data, success: true });
    }
  } catch (error) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.get("/appointment-info/:id/:date", async (req, res) => {
  try {
    const date1 = req.params.date + "T00:00:00.000+00:00";

    const appointments = await Appointment.find({
      doctorid: req.params.id,
      date: date1,
    });
    if (appointments) {
      res.status(200).send({ message: "done", appointments, success: true });
    }
  } catch (error) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.post("/select-doctor/:id", async (req, res) => {
  try {
    const usertoselect = await DoctorLogindataSchema.findOne({
      _id: req.params.id,
    });
    await DoctorLogindataSchema.updateOne(
      { _id: req.params.id },
      { $set: { condition: "Active" } }
    );
    res.status(200).send({ message: "done" });
  } catch (err) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.post(
  "/register-doctor",
  upload.fields([{ name: "profilePhoto" }, { name: "certificates" }]),
  async (req, res) => {
    try {
      const emailcha = await DoctorLogindataSchema.findOne({
        email: req.body.email,
      });
      if (emailcha) {
        console.log("emial clone request");
        res
          .status(200)
          .send({ message: "Email already exists", success: false });
      }
      const phonecha = await DoctorLogindataSchema.findOne({
        phone: req.body.phone,
      });

      if (phonecha) {
        console.log("phone clone request");
        res
          .status(200)
          .send({ message: "Phone already exists", success: false });
      }
      if (!emailcha && !phonecha) {
        const formData = req.body;
        const profilePhoto = req.files.profilePhoto[0].filename;
        const certificates = req.files.certificates.map(
          (file) => file.filename
        );
        const hashpwd = await bcrypt.hash(formData.password, saltrounds);
        // Create a new FormData document
        const newFormData = new DoctorLogindataSchema({
          name: formData.name,
          email: formData.email,
          password: hashpwd,
          address: formData.address,
          gender: formData.gender,
          age: formData.age,
          phone: formData.phone,
          speciality: formData.speciality,
          experience: formData.experience,
          condition: formData.condition,
          profilePhoto,
          certificates,
        });

        // Save the document to the database

        await newFormData.save();
        console.log(`${req.body.name} registered success`);
        res
          .status(200)
          .send({ message: "Data saved successfully", success: true });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error saving form data", success: false });
    }
  }
);
app.get("/get-verified-doctors", async (req, res) => {
  try {
    const verificationlist = await DoctorLogindataSchema.find({
      condition: "Inactive",
    });
    if (!verificationlist) {
      res.status(200).send({ message: "Kei ni bhetina", success: false });
    } else {
      res.status(200).send({
        message: "retrieving data",
        verificationlist,
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).send({ message: "Internal error", success: false });
  }
});
app.get("/get-pending-doctor-profile/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const prendingdoctorlist = await DoctorLogindataSchema.findOne({
      _id: req.params.id,
    });
    if (!prendingdoctorlist) {
      res.status(200).send({ message: "Kei ni bhetina", success: false });
    } else {
      console.log("payo");
      res.status(200).send({
        message: "retrieving data",
        prendingdoctorlist,
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).send({ message: "Internal error", success: false });
  }
});

app.listen(PORT, "192.168.0.114", () => {
  console.log(`Server started on 192.168.0.114:${PORT}`);
});
