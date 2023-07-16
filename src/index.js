const express = require("express");
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 8000;

const partials_Path = path.join(__dirname,'./templates/partials');
const templates_path = path.join(__dirname,'./templates/views');

app.use(express.static('public'));
app.set('view engine', 'hbs');
hbs.registerPartials(partials_Path);
app.set('views', templates_path)


app.get("", (req, res) => {
  res.render('index');
})

app.get("/weather", (req, res) => {
  res.render("weather");
})

app.get("/about", (req, res) => {
  res.render('about');
})

app.get("*", (req, res) => {
  res.render('404error',{
    errorMsg: 'Opps! page not found'
  });
})

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
