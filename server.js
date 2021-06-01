// Load the modules
var express = require('express'); //Express - a web application framework that provides useful utility functions like 'http'
var app = express();
var bodyParser = require('body-parser'); // Body-parser -- a library that provides functions for parsing incoming requests
app.use(bodyParser.json());              // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
const axios = require('axios');
const qs = require('query-string');

var pgp = require('pg-promise')();

const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'brewery_db',
	user: 'postgres',
	password: 'pwd'
};

// const isProduction = process.env.NODE_ENV === 'production';
// const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// if (isProduction) {
//   pgp.pg.defaults.ssl = {rejectUnauthorized: false};
// }

const db = pgp(dbConfig);

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));// Set the relative path; makes accessing the resource directory easier


// Home page - DON'T CHANGE
app.get('/', function(req, res) {
  res.render('pages/main', {
    my_title: "Brewery Reviews",
    items: '',
    error: false,
    message: 'Welcome!'
  });
});

app.get('/reviews', function(req, res) {
  var brewery  = 'select * from brewery;';

  db.task('get-everything', task => {
    return task.batch([
      task.any(brewery)
    ]);
  })
  .then(items=> {
    // TODO: Return the reviews to the front-end (e.g., res.render(...);); Try printing 'items' to the console to see what the GET request to the Twitter API returned.
    // Did console.log(items) return anything useful? How about console.log(items.data.results)?
    // Stuck? Look at the '/' route above
    console.log(items);
    res.render('pages/reviews',{
      my_title: "Brewery Reviews",
      items: items[0],
      error: false,
      message: ''
    })
    
  })
  .catch(error => {
    console.log(error);
    res.render('pages/reviews',{
      my_title: "Brewery Reviews",
      items: '',
      error: true,
      message: error
    })
  });
});

//to request data from API for given search criteria
//TODO: You need to edit the code for this route to search for movie reviews and return them to the front-end
app.post('/get_feed', function(req, res) {
  var city = req.body.city; //TODO: Remove null and fetch the param (e.g, req.body.param_name); Check the NYTimes_home.ejs file or console.log("request parameters: ", req) to determine the parameter names

  if(city) {
    axios({
      url: `http://api.openbrewerydb.org/breweries?by_city=${city}`,
        method: 'GET',
        dataType:'json',
      })
        .then(items => {
          // TODO: Return the reviews to the front-end (e.g., res.render(...);); Try printing 'items' to the console to see what the GET request to the Twitter API returned.
          // Did console.log(items) return anything useful? How about console.log(items.data.results)?
          // Stuck? Look at the '/' route above
          console.log(items);
          res.render('pages/main',{
            my_title: "Brewery Reviews",
            items: items.data,
            error: false,
            message: ''
          })
          
        })
        .catch(error => {
          console.log(error);
          res.render('pages/main',{
            my_title: "Brewery Reviews",
            items: '',
            error: true,
            message: error
          })
        });


  }
  else {
    // TODO: Render the home page and include an error message (e.g., res.render(...);); Why was there an error? When does this code get executed? Look at the if statement above
    // Stuck? On the web page, try submitting a search query without a search term
    res.render('pages/main',{
      my_title: "Brewery Reviews",
      items: items.data,
      error: true,
      message: 'error occurred'
    })
    
  }

});

app.post('/create', function(req,res) {
  var brewery_name = req.body.name;
  var review = req.body.review;

  var currentdate = new Date(); 
  var review_date = (currentdate.getMonth()+1) + "/"
                  + currentdate.getDate()  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();


  var insert_statement = "INSERT INTO brewery(brewery_name, review, review_date) VALUES ('" + brewery_name + "','" + review + "','" + review_date + "') ON CONFLICT DO NOTHING; ";
  db.task('post-data', task => {
    return task.batch([
        task.any(insert_statement)
    ]);
})

  .then(items => {
    console.log('Review Creation Successful');
    res.redirect('/reviews');
  })

	.catch(err => {
		console.log(`Post Creation Error:\n ${err}`);
	});
  
});

app.get('/filter_reviews', function(req, res) {
  var brewery_name = req.body.name;
  var brewery  = "select * from brewery where brewery_name = '" + brewery_name + "';";

  db.task('get-everything', task => {
    return task.batch([
      task.any(brewery_name),
      task.any(brewery)
    ]);
  })
  .then(items=> {
    // TODO: Return the reviews to the front-end (e.g., res.render(...);); Try printing 'items' to the console to see what the GET request to the Twitter API returned.
    // Did console.log(items) return anything useful? How about console.log(items.data.results)?
    // Stuck? Look at the '/' route above
    console.log(items);
    res.render('pages/reviews',{
      my_title: "Brewery Reviews",
      items: items[0][1],
      error: false,
      message: ''
    })
    
  })
  .catch(error => {
    console.log(error);
    res.render('pages/reviews',{
      my_title: "Brewery Reviews",
      items: '',
      error: true,
      message: error
    })
  });
});

app.listen(3000);
console.log('3000 is the magic port');
