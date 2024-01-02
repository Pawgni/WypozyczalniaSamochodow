const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const User = require('./models/User.js');
const Car = require('./models/Car.js');
const Booking = require('./models/Booking.js');
const app = express();
 
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sad23reesfdsf34342sds';
 
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));
 
mongoose.connect('mongodb://127.0.0.1:27017/CarRental', { useNewUrlParser: true, useUnifiedTopology: true });
 
function getUserDataFromReq(req) {
  return new Promise ((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);  
    });
  });
}

app.get("/GetUsers", (req, res) => {
  User.find({}).then(function(users) {
    res.json(users);
  }).catch(function(err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});
 
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
 
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.status(201).json(userDoc);
  } catch (e) {
    console.error(e);
    res.status(422).json({ error: 'Registration failed' });
  }
});
 
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
 
  if (userDoc) {
    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
 
    if (isPasswordValid) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id
      }, jwtSecret, {}, (err, token) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.cookie('token', token).json(userDoc);
        }
      });
    } else {
      res.status(422).json('Invalid password');
    }
  } else {
    res.status(404).json('User not found');
  }
});
 
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const { name, email, _id } = await User.findById(userData.id); 
        res.json({ name, email, _id });
      }
    });
  } else {
    res.json(null);
  }
});
 
app.post('/logout', (req, res) => {
  res.clearCookie('token').json(true);
});
 
app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName
  });
  res.json(newName);
});
 
app.post('/mycars', (req, res) => {
  const { token } = req.cookies;
  const {
    title, address, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxSeats, price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const carDoc = await Car.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxSeats,
        price,
      });
      res.json(carDoc);
    }
  });
});
 
app.get('/mycars', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});
 
app.get('/mycars/:id', async (req, res) => {
  const { id } = req.params;
  const car = await Car.findById(id);
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ error: 'Car not found' });
  }
});

app.put('/mycars', async (req,res) => {
  const { token } = req.cookies;
  const {
    id, title, address, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxSeats,price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if(err) throw err;
    const mycarDoc = await Car.findById(id);
     if(userData.id === mycarDoc.owner.toString()){
        mycarDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxSeats,
        price,
      });
      await mycarDoc.save();
      res.json('ok');
    }
  });
});
 
app.get('/user-mycars', (req,res) => {
  const{token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json(await Car.find({owner:id}) );
  });
});

app.post('/bookings', async (req,res) => {
  const userData = await getUserDataFromReq(req);
  const {car,checkIn,checkOut,numberOfPassengers,name,phone,price,} =req.body;
  Booking.create({
    car,checkIn,checkOut,numberOfPassengers,name,phone,price,
    user:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
});

app.get('/bookings', async (req,res) => {
  const userData= await getUserDataFromReq(req);
  res.json ( await Booking.find({user:userData.id}).populate('car') );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});