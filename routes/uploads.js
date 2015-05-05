/**
 * Created by chenchaowei on 3/17/15.
 */
/**
 * Created by chenchao on 3/12/15.
 */
var express = require('express');

var router = express.Router();
var multer  = require('multer');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', function (err) {
    if (err) console.log('could not connect to mongodb ...');
    else console.log('Successfully connected to mongodb ... ');
});

var File = mongoose.model('Upload',{
    name: String,
    info: mongoose.SchemaTypes.Mixed
});


/* GET home page. */
router.use('/',multer({ dest: './uploads/'}));


//router.post('/',function(req,res) {
//console.log(req.files);
//res.status(200).json({message:'ok'});
//});


router.post('/', function (req, res) {
    var file = new File({
        name: req.files["upfile"].name,
        info: req.files["upfile"]
    });
    file.save(function (err, results) {
        console.log(err);
        if (err) res.status(500).json({message: '500 INTERNAL - NOT IMPLEMENTED'});
        else res.status(200).json({message: 'File Saved!'});
    });
});

router.get('/',function(req,res) {
    File.find({},{name: 1,info: 1,_id: 0},function(err,results) {
        if (err) res.status(500).json({message: '500 INTERNAL - NOT IMPLEMENTED'});
        else res.status(201).json(results);
        console.log(results);
    })
});



router.get('/showfiles',function (req,res) {
    res.render('show_uploads');
});




module.exports = router;