 const express        = require("express"),
      app             = express(),
      bodyParser      = require("body-parser"),
      mongoose        = require("mongoose"),
      methodOverride  = require('method-override'),
      passport        = require('passport'),
      LocalStrategy   = require('passport-local'),
      Music           = require('./models/music'),
      Artist          = require('./models/artist'),
      User            = require('./models/user'),
      multer          = require('multer'),
      path            = require('path'),
      storage         = multer.diskStorage({
              destination: function(req, file, callback){
                callback(null,'./public/uploads/');
              },
              filename: function(req, file, callback){
                callback(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
              }
            }),
      imageFilter = function (req, file, callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
          return callback(new Error('Only JPG, Jpeg, PNGn and GIF image file are allowed!'), false);
        }
        callback(null, true);
      },
      upload = multer({storage: storage, fileFilter: imageFilter}),
      seedDB        = require('./seed');

mongoose.connect("mongodb://localhost/uMusic");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.static("public"));
// seedDB();

app.use(require('express-session')({
  secret: 'secret is always secret.',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})

app.get("/", function (req, res) {
  res.render("home.ejs");
});

app.get("/list", function (req, res) {
  res.render("Music/list.ejs");
});

app.get("/favorite", function (req, res) {
  Music.find({}, function (err, allMusic) {
    if (err) {
      console.log(err);
    } else {
      res.render("favorite/favorite.ejs", { music: allMusic });
    }
  });
});

app.get("/list", function (req, res) {
  Music.find({name: req.params.name}, function (err, foundMusic) {
    if (err) {
      console.log(err);
    } else {
      res.render("Music/list.ejs", { music: foundMusic });
    }
  });
});

// app.post('/favorite', function(req, res){
//   var title = req.body.title;
//   var name  = req.body.name;
//   var image  = req.body.image;
//   var newFavorite = 
// })

app.get("/homeclick", function (req, res) {
  Music.find({}, function (err, allMusic) {
    if (err) {
      console.log(err);
    } else {
      res.render("Music/index.ejs", { music: allMusic });
    }
  });
});

app.get("/homeclick/:id", function (req, res) {
  Music.findById(req.params.id, function (err, foundMusic) {
    if (err) {
      console.log(err);
    } else {
      res.render("Music/show.ejs", { music: foundMusic });
    }
  });
});

app.get("/register", function (req, res) {
  res.render("register.ejs");
});


app.get("/artist", function (req, res) {
  Artist.find({}, function (err, allArtist) {
    if (err) {
      console.log(err);
    } else {
      res.render("artist.ejs", { artist: allArtist });
    }
  });
});

app.post("/artist", upload.single('image'), function(req,res){
  req.body.artist.image = '/uploads/'+ req.file.filename;
  // var newMusic = {title:title, name:name, image:image};
  Artist.create(req.body.artist, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect('/artist');
    }
  });
});

app.get("/artist/:id", function (req, res) {
  Artist.findById(req.params.id, function (err, foundArtist) {
    if (err) {
      console.log(err);
    } else {
      res.render("editartist.ejs", { artist: foundArtist });
    }
  });
});

app.put('/artist/:id', upload.single('image'), function(req, res){
  if(req.file){
    req.body.artist.image = '/uploads/'+ req.file.filename;
  }
  Artist.findByIdAndUpdate(req.params.id, req.body.artist, function(err, updatedArtist){
    if(err){
      res.redirect('/artist');
    } else {
      res.redirect('/artist');
    }
  });
});

app.delete("/artist/:id", function (req, res) {
 Artist.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/artist');
    } else {
      res.redirect('/artist');
    }
  });
});

app.get("/music/newartist", function (req, res) {
  res.render("newartist.ejs");
});

app.get("/music", function (req, res) {
  Music.find({}, function (err, allMusic) {
    if (err) {
      console.log(err);
    } else {
      res.render("music.ejs", { music: allMusic });
    }
  });
});

app.get("/music/new", function (req, res) {
  res.render("new.ejs");
});

app.post("/music", upload.single('image'), function(req,res){
  req.body.song.image = '/uploads/'+ req.file.filename;
  // var newMusic = {title:title, name:name, image:image};
  Music.create(req.body.song, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect('/music');
    }
  });
});

app.get("/music/view/:id", function (req, res) {
  Music.findById(req.params.id, function (err, foundMusic) {
    if (err) {
      console.log(err);
    } else {
      res.render("view.ejs", { music: foundMusic });
    }
  });
});

app.get("/music/:id", function (req, res) {
  Music.findById(req.params.id, function (err, foundMusic) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit.ejs", { music: foundMusic });
    }
  });
});

app.put('/music/:id', upload.single('image'), function(req, res){
  if(req.file){
    req.body.song.image = '/uploads/'+ req.file.filename;
  }
  Music.findByIdAndUpdate(req.params.id, req.body.song, function(err, updatedMusic){
    if(err){
      res.redirect('/music');
    } else {
      res.redirect('/music');
    }
  });
});

app.delete("/music/:id", function (req, res) {
  Music.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/music');
    } else {
      res.redirect('/music');
    }
  });
});

app.post('/register', function(req , res){
  var newUser = new User({username: req.body.username});
  if(req.body.adminCode === 'topsecret'){
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/homeclick');
    });
  });
});

app.get("/login", function (req, res) {
  res.render("login.ejs");
});

app.post('/login', passport.authenticate('local',
  {
    successRedirect: '/homeclick',
    failureRedirect: '/login' 
  }), function(res, req){
});

app.get('/logout',function(req , res){
    req.logout();
    res.redirect('/')
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

app.listen(3000, function () {
  console.log("Server is running");
});