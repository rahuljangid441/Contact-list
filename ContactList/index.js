const express = require('express');
const path = require('path');
const port = 800;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));



// var contactList = [
//     {
//         name: "Rahul jangid",
//         phone: "8860288996"
//     },
//     {
//         name: "gudia",
//         phone: "9654107057"
//     },
//     {
//         name: "nonu",
//         phone: "9650789923"
//     }
// ]

app.get('/', function (req, res) {
    // console.log(req);
    // res.send('<h1>hurray cool its running fine</h1>')

    //to render .ejs file form views
    // return res.render('home',{
    //     title:"my contact list",
    //     contact_list:contactList

    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log("error in fetching details from DB");
            return;
        }
        return res.render('home', {
            title: "my contact list",
            contact_list: contacts

        })
    });
})
app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: "let's play with ejs"

    });
});

//this is to append contact and name enter into form to append into the existing contact list

app.post('/create-contact', function (req, res) {
    // return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    //shortcut to add contact in contactList
    // contactList.push(req.body);
    // return res.redirect('/');


    //push data into the database
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log("error in creating contact");
            return;
        }
        console.log('******', newContact);
        return res.redirect('back');
    });
});

//we can render different pages .
// app.get('/profile',function(req,res){
//     res.send('<h1>hurray i am profile</h1>')
// })
// app.get('/about',function(req,res){
//     res.send('<h1>hurray i am about</h1>')
// })

//delete contact form contact list

app.get('/delete-contact/', function (req, res) {
    // console.log(req.query);
    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }
    // return res.redirect('back');

    //delete contact from db
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log("error in deleting object from database");
            return;
        }
        return res.redirect('back');
    })

});
app.listen(port, function (err) {
    if (err) {
        console.log(`there is an error in running the server`);
        return;
    }
    console.log(`my express server is running fine on port:${port}`);
});