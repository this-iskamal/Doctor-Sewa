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
    }
    const ispasswordmatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!ispasswordmatch ) {
      res.status(200).send({ message: "password dont match", success: false });
    } else if (user && ispasswordmatch) {
      res
        .status(200)
        .send({ message: "login success", success: true, role: user.youare });
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/doctorlogin", async (req, res) => {
  try {
    const doctor = await DoctorLogindataSchema.findOne({ email: req.body.email });
    if (!doctor) {
      res.status(200).send({ message: "user not found", success: false });
    }
    const ispasswordmatch = await bcrypt.compare(
      req.body.password,
      doctor.password
    );

    if (!ispasswordmatch ) {
      res.status(200).send({ message: "password dont match", success: false });
    } else if (doctor && ispasswordmatch) {
      res
        .status(200)
        .send({ message: "login success", success: true});
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/admin-dashboard", async (req, res) => {
  try {
    const patientnumber = await LogindataSchema.count({ youare: "patient" });
    const doctornumber = await LogindataSchema.count({ youare: "doctor" });
    const patientdetails = await LogindataSchema.find({ youare: "patient" });
    const doctordetails = await LogindataSchema.find({ youare: "doctor" });
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
    const doctordetails = await LogindataSchema.find({ youare: "doctor" });
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

app.delete("/admin-dashboard/:id", async (req, res) => {
  try {
    const usertobedeleted = await LogindataSchema.findOne({
      _id: req.params.id,
    });
    await LogindataSchema.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: `user deleted : ${usertobedeleted.username}`,
      success: true,
    });
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
        console.log('emial clone request')
        res
          .status(200)
          .send({ message: "Email already exists", success: false });
      }
      const phonecha = await DoctorLogindataSchema.findOne({
        phone: req.body.phone,
      });
      
      if (phonecha) {
        console.log('phone clone request')
        res
          .status(200)
          .send({ message: "Phone already exists", success: false });
      } 
      if(!emailcha&&!phonecha) {
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
          profilePhoto,
          certificates,
        });

        // Save the document to the database

        await newFormData.save();
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
    const verificationlist = await DoctorLogindataSchema.find({});
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

app.listen(PORT,'192.168.0.114', () => {
  console.log(`Server started on 192.168.0.114:${PORT}`);
});
