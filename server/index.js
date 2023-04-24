const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const http = require("http");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

require("dotenv").config();
require("./db/conn");
const LogindataSchema = require("./models/LogindataSchema");
const DoctorLogindataSchema = require("./models/DoctorLogindataSchema");
const Appointment = require("./models/Appointment");
const moment = require("moment-timezone");
const smtpTransport = require("nodemailer-smtp-transport");

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

// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandbox5a2c92b456c742f1a7ac564619bc459a.mailgun.org';
// const mg = mailgun({apiKey: '6c7436c7abdc135e5a5888eea066f85c-2cc48b29-3912228d', domain: DOMAIN});
// const data = {
// 	from: 'Excited User <me@samples.mailgun.org>',
// 	to: 'kamaldp.gautam@gmail.com',
// 	subject: 'Hello',
// 	text: 'Testing some Mailgun awesomness!'
// };
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// });

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "doctorsewa770@gmail.com", // generated ethereal user
    pass: "klblvnquommmnfpv", // generated ethereal password
  },
});

// send mail with defined transport object
// let info = await transporter.sendMail({
//   from: ' Doctor Sewa <doctorsewa770@gmail.com>', // sender address
//   to: "kamal.gautam.36808@gmail.com", // list of receivers
//   subject: "Hello ✔", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// });

// console.log("Message sent");
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

//reminders pathauni thau
// const current = new Date();
// console.log(current)

//*****yehe bata reminder pathauni aaile comment gareko xa*****//
cron.schedule("0 0 * * *", async () => {
  const currentTime = new Date();
  console.log("done");
  const appointm = await Appointment.find({
    patientid: { $exists: true, $ne: "" },
    date: {
      $gt: currentTime,
      $lt: new Date(currentTime.getTime() + 24 * 60 * 60 * 1000),
    },
  });
  const appointmenttodelete = await Appointment.find({
    date: { $lt: currentTime },
  });
  if (appointmenttodelete) {
    await Appointment.deleteMany({
      date: { $lt: currentTime },
    });
  }

  appointm.forEach((appoint) => {
    const mailOptions = {
      from: "doctorsewa770@gmail.com",
      to: appoint.patientEmail,
      subject: "Reminder: Your appointment is coming up soon!",
      html: `
        <body>
          <h1>Appointment Reminder</h1>
          <p>Dear ${appoint.patientName},</p>
          <p>This is a  reminder that you have an upcoming appointment with <b>${appoint.doctorName} on </b> <span style='color:red'><b>  ${appoint.date} at ${appoint.time}</b></span>.</p>
          <p>Please make sure to arrive on time and bring any necessary documents or information with you.</p>
          <p>If you need to reschedule or cancel your appointment, please do so as soon as possible by contacting us at +9779846944680 </p>
          <p>Thank you for choosing our service for your healthcare needs.</p>
          <p>Sincerely,</p>
          <p>Doctor Sewa Team</p>
        </body>
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending reminder email:", error);
      } else {
        console.log(`Reminder email sent to ${appoint.patientName}`);
      }
    });
  });
});

app.post("/change-password/:id", async (req, res) => {
  try {
    const patient = await LogindataSchema.findOne({
      _id: req.params.id,
    });
    if (patient) {
      hashnewpwd = await bcrypt.hash(req.body.password, saltrounds);
      query = { _id: req.params.id };
      update = { $set: { password: hashnewpwd } };
      await LogindataSchema.findOneAndUpdate(query,update,{returnOriginal:false})
      res.status(200).send({message:"password change successfull", success:true})
    }
  } catch (error) {
    res.status(200).send({ message: "Internal error", success: false });
  }
});

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
      const speciality = patient.speciality;

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
        speciality,
      });
    } else {
      res.status(200).send({ message: "not found name" });
    }
  } catch (err) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.post("/patient-cancel-appointment/:appid", async (req, res) => {
  try {
    const query = {
      _id: req.params.appid,
    };
    const update = {
      $set: {
        status: "available",
        patientName: "",
        patientid: "",
        patientEmail: "",
      },
    };
    await Appointment.findOneAndUpdate(query, update, {
      returnOriginal: false,
    });
    console.log("done");
    res.status(200).send({
      message: `Appointment canceled`,
      success: true,
    });
  } catch (error) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.get("/find-doctors", async (req, res) => {
  const query = req.query.q;
  let doctors;
  try {
    if (!query) {
      doctors = await DoctorLogindataSchema.find({ condition: "Active" });
    } else {
      doctors = await DoctorLogindataSchema.find({
        speciality: {
          $regex: query,
          $options: "i",
        },
        condition: "Active",
      });
    }

    res.status(200).send({ message: "searching", doctors });
  } catch (error) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.get("/patient-edit-information/:id", async (req, res) => {
  try {
    const patientInfo = await LogindataSchema.findOne({
      _id: req.params.id,
    });
    if (patientInfo) {
      res.status(200).send({ message: "found info", patientInfo });
    }
  } catch (error) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.post("/patient-update-information/:id", async (req, res) => {
  try {
    const query = {
      _id: req.params.id,
    };
    const updateUsername = {
      $set: {
        username: req.body.username,
      },
    };
    const updateEmail = {
      $set: {
        email: req.body.email,
      },
    };
    const updateAddress = {
      $set: {
        district: req.body.address,
      },
    };
    const updateGender = {
      $set: {
        gender: req.body.gender,
      },
    };
    const updateAge = {
      $set: {
        age: req.body.age,
      },
    };

    if (req.body.username) {
      await LogindataSchema.findOneAndUpdate(query, updateUsername, {
        returnOriginal: false,
      });
      console.log("name change");
    } else if (req.body.email) {
      await LogindataSchema.findOneAndUpdate(query, updateEmail, {
        returnOriginal: false,
      });
      console.log("change email");
    } else if (req.body.address) {
      await LogindataSchema.findOneAndUpdate(query, updateAddress, {
        returnOriginal: false,
      });
      console.log("address change");
    } else if (req.body.gender) {
      await LogindataSchema.findOneAndUpdate(query, updateGender, {
        returnOriginal: false,
      });
      console.log("gender change");
    } else if (req.body.age) {
      await LogindataSchema.findOneAndUpdate(query, updateAge, {
        returnOriginal: false,
      });
      console.log("age change");
    }

    res.status(200).send({ message: "update successfull", success: true });
  } catch (error) {
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
    const appcount = await Appointment.count({
      patientid: req.params.id,
      date: req.body.date,
    });
    if (appcount === 1) {
      res.status(200).send({
        message: `You can only book one appointment `,
        success: false,
      });
    }
    if (appcount === 0) {
      const doctor = await DoctorLogindataSchema.findOne({
        _id: req.params.id1,
      });
      const date1 = req.body.date + "T00:00:00.000+00:00";
      const try1 = await Appointment.findOne({
        doctorid: req.params.id1,
        time: req.body.time,
        date: date1,
        status: "unavailable",
      });
      const patient = await LogindataSchema.findOne({ _id: req.params.id });
      if (!try1) {
        console.log("hello");
        const query = {
          doctorid: req.params.id1,
          time: req.body.time,
          date: date1,
        };
        const update = {
          $set: {
            status: "unavailable",
            patientName: patient.username,
            patientid: patient._id,
            patientEmail: patient.email,
          },
        };
        await Appointment.findOneAndUpdate(query, update, {
          returnOriginal: false,
        });
        res.status(200).send({
          message: `Booking succes to doctor ${doctor.name} for date ${req.body.date} at ${req.body.time}`,
          success: true,
        });
      } else {
        res.status(200).send({
          message: `Appointment already booked!`,
          success: false,
        });
      }
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

app.post("/send-otp/:id", async (req, res) => {
  try {
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(Math.random() * (max - min + 1) + min);
    const patient = await LogindataSchema.findOne({
      _id: req.params.id,
    });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "doctorsewa770@gmail.com", // generated ethereal user
        pass: "klblvnquommmnfpv", // generated ethereal password
      },
    });
    const mailOptions = {
      from: "doctorsewa770@gmail.com",
      to: patient.email,
      subject: "Change Password OTP",
      html: `
        <body>
          <h1>Password Change Request for OTP</h1>
          <p>Dear ${patient.username},</p>
         
          <br>
          <p>Your OTP is <br> <b><h1>${otp}</h1></b>
          <br>

          <p>Please do not share your OTP with others </p>

          <p>Sincerely,</p>
          <p>Doctor Sewa Team</p>
        </body>
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending OTP:", error);
      } else {
        console.log(`OTP sent to ${patient.username}`);
      }
    });

    const query = { _id: req.params.id };
    const update = { $set: { otp: otp } };
    await LogindataSchema.findOneAndUpdate(query, update, {
      returnOriginal: false,
    });
    res
      .status(200)
      .send({ message: "OTP sent successfully to your email", success: true });
    setTimeout(async () => {
      const query1 = { _id: req.params.id };
      const update1 = { $set: { otp: "" } };
      await LogindataSchema.findOneAndUpdate(query1, update1, {
        returnOriginal: false,
      });
      console.log("otp destroyed");
    }, 300000);
  } catch (error) {
    res.status(200).send({ message: "internal error", success: false });
  }
});

app.post("/otp-confirm/:id", async (req, res) => {
  try {
    const patient = await LogindataSchema.findOne({
      _id: req.params.id,
    });
    if (patient.otp === req.body.password) {
      res.status(200).send({ message: "OTP confirmed", success: true });
    } else {
      res.status(200).send({ message: "Invalid OTP", success: false });
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
