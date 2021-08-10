const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

//middlewares
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

var posts =[];


//  basic landing pages
app.get('/',function(req,res){
  res.render('home',{home_start:homeStartingContent,posts:posts});
});

app.get('/about' , function(req,res){
  res.render('about',{about_A:aboutContent});
});

app.get('/contact' , function(req,res){
  res.render('contact',{contact_A:contactContent});
});

app.get('/compose',function(req,res){
  res.render('compose');
})



// individual post page request handling
app.get('/posts/:post_name',function(req,res){
  let post_n = req.params.post_name;
  let f = 0;

  posts.forEach(function(post){

    let str1 = _.lowerCase(post_n);
    let str2 = _.lowerCase(post.title);

    if ( str1 === str2 )
      {
        console.log("FOUND!");
        f = 1;
        res.render("post",{tit:post.title,pos:post.content});
      }
  });

  if ( f === 0 )
    console.log("NOT THERE BUD!");
})




// post requests

app.post('/compose',function(req,res){
  const post = {
    title:req.body.Tinput,
    content:req.body.Pinput
  }
  posts.push(post);
  res.redirect('/');
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

