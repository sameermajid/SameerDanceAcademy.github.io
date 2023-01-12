const express=require("express");
const path=require("path");
const app=express();
const port=8000;
const mongoose=require('mongoose');
mongoose.set("strictQuery", false);
 mongoose.connect('mongodb://127.0.0.1:27017/contacts');
const contactschema= new mongoose.Schema({
    name:String,
    contact:String,
    email:String,
    address:String,
    concern:String
})
const data2 = mongoose.model('data2', contactschema);
// EXPRESS SPECIFIC STUFF
app.use( express.static('static'));
app.use("/static", express.static('static'));
app.use(express.urlencoded({ extended: true }))
//PUG SPECIFIC STUFF
app.set('view engine','pug')
app.set('views',path.join(__dirname, 'views'))
//ENDPOINTS
app.get('/',(req, res)=>{
    res.status(200).render('home.pug')
})
app.get('/contact',(req, res)=>{
    res.status(200).render('contact.pug')
})
app.post('/contact',async(req, res)=>{
    const data=data2(req.body)
    await data.save().then(()=>{
        res.send("The data was saved")
    }).catch(()=>{
        res.send("The data not was saved")
    })
})
//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started succesfully on port ${port}`)
})