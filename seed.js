var mongoose = require('mongoose');
var Music = require('./models/music');

var data = [
    {
        title: 'กีดกัน', 
        name: 'billkin', 
        image: 'https://s359.kapook.com/pagebuilder/e8f8fe98-7e4c-47fc-a35a-3be3f71ed627.jpg' 
    },
    {
        title: 'กอดในใจ', 
        name: 'billkin', 
        image: 'https://image.joox.com/JOOXcover/0/a8fa65b74615317c/300' 
    },
    {
        title: 'แปลไม่ออก', 
        name: 'billkin', 
        image: 'https://i.kfs.io/album/global/92038161,0v1/fit/500x500.jpg' 
    },
    {
        title: 'โครตพิเศษ', 
        name: 'billkin', 
        image: 'https://pbs.twimg.com/media/EnPBTFFUwAArlEk.jpg' 
    },
    {
        title: 'คิดไม่ออก', 
        name: 'billkin', 
        image: 'https://i.ytimg.com/vi/0iww5vMh4J8/maxresdefault.jpg' 
    },
    {
        title: 'รู้งี้เป็นแฟนกันตั้งนานแล้ว', 
        name: 'billkin', 
        image: 'https://image.joox.com/JOOXcover/0/5c9be1b039cf4242/300' 
    },
    {
        title: 'กีดกัน', 
        name: 'billkin', 
        image: 'https://s359.kapook.com/pagebuilder/e8f8fe98-7e4c-47fc-a35a-3be3f71ed627.jpg' 
    }
];

function seedDB(){
    Music.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("Remove DB completed");
        data.forEach(function(seed){
            Music.create(seed, function(err, music){
                if (err) {
                    console.log(err);
                } else {
                    console.log('New data added');
                }
            });
        });
    });
}

module.exports = seedDB;
