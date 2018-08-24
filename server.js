const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const maintenance = require('maintenance');
const port = process.env.PORT || 3000;

let app = express();
app.set('view engine','hbs');
app.use( (req, res, next) => {
    let now = new Date();
    let log = `time : ${now} : ${req.method} ${req.url}` ;
    console.log( log );
    fs.appendFile('server.log',log + '\n' ,(err) =>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    
     next();
  });

  //maintenance 
  /*
  app.use((req,res,next)=>{
      console.log(req.url);
      res.render('maintenance.hbs',{
                Body : 'Maintenance',
                Author : 'Desh',
                Reason : 'Site being updated at the moment'
            });
     // res.send(200);
  })
*/
//   maintenance(app,true);
 
//register partials
hbs.registerPartials(__dirname+ "/views/partials");
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
//capitalization
hbs.registerHelper('screamIt',(str)=>{
    return str.toUpperCase();
})



//help.html
app.use(express.static(__dirname + "/public"));
// app.get('/',(req,res)=>{
//     //res.send(`<h1>Hello Express !</h1>`);

//     res.send({
//         name:'Desh',
//         likes : ['Boxing','Brazilian Jiu-Jitsu','Kickboxing']
//     });
// });

app.get('/',(req,res)=>{
    res.render('welcome.hbs',{
        Title : 'Home page',
        welcomeText : `Welcome to Our page`,
        Author : 'Desh'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        Title : 'About Us',
        Author : 'Desh'
    });
});

app.get('/project',(req,res)=>{
    res.render('project.hbs',{
            Title: 'Our Port Folio',
            Author : 'Desh'
    });
})
// maintenance
// app.get('/maintenance',(req,res)=>{
//     res.render('maintenance.hbs',{
//         Body : 'Maintenance',
//         Author : 'Desh'
//     });
// });
// /bad - send back json with errorMessage 
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : `Bad request`
    });
   
});


app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});


