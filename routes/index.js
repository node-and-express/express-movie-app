var express = require('express');
var router = express.Router();

// Get the default instance
const axios = require('axios')

const apiKey='1fb720b97cc13e580c2c35e1138f90f8';

const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

/* GET home page. */
//set imageBaseUrl as global to whole application
router.use((req,res,next) => {
    res.locals.imageBaseUrl=imageBaseUrl;
    next();
});

//following middleware is use to solve content policy errors in console
router.use((req, res, next) => {
  res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'");
  next();
})

router.get('/', function(req, res, next) {
  // Make the GET call by passing a config object to the instance
  axios.get(nowPlayingUrl).then(apiRes => {
    // process the response
     var data = apiRes.data.results;
     //console.log(data);
     //res.json(data);
     res.render('index',{data:data});
  });

  //res.render('index', {  });
});

router.get('/movie/:id',(req,res,next)=>{
  const movieId=req.params.id;
  const url=`${ apiBaseUrl }/movie/${ movieId }?api_key=${ apiKey }`;
  axios.get(url).then(apiRes=>{
    const data=apiRes.data;
    res.render('detail',{data:data});
  });
  //res.send(movieId);
});

router.post('/search',(req,res,next)=>{
  const search=encodeURI(req.body.movieSearch);
  const cat=req.body.cat;
  const url=`${ apiBaseUrl }/search/${ cat }?query=${ search }&api_key=${ apiKey }`;
  axios.get(url).then(apiRes=>{
    const data=apiRes.data.results;
    //res.json(data);
    res.render('index',{data:data});
  });
  //res.send(movieId);
});

module.exports = router;
