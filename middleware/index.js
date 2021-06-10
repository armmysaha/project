var Music = require ('../models/music');

var middlewareObj = {};

middlewareObj.ckeckMusicOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Music.findById(req.params.id, function(foundMusic){
            if(err){
                res.redirect('back');
            } else {
                if (foundMusic.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back')
                }
            }
        });
    } else{
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/login');
}

module.exports = middlewareObj;