window.addEventListener('load',function(){
    var title = getCookie('key');
    window.document.title = title;
})

var similarMovie1 = "";
var similarMovie2 = "";

function loadPageWithData(){
    var moviObje = JSON.parse(localStorage.getItem('movie'));
    var posterImage = document.querySelector('.moviePosterPhotoClass');
    posterImage.src = moviObje.poster;

    var moviePics = document.querySelectorAll('.screenShotClass');
    moviePics[0].src = moviObje.pic1;
    moviePics[1].src = moviObje.pic2;

    var movieDeatils = document.querySelectorAll('#movieDetailsTwo p');
    // console.log(moviObje);
    movieDeatils[0].innerText = moviObje.Title;
    movieDeatils[1].innerText = moviObje.Year;
    movieDeatils[2].innerText = getCookie('cat'); // Catigory

    var trailer = document.querySelector('video');
    trailer.src = moviObje.trailer;

    var imdb = document.querySelector('progress+b');
    imdb.innerText = moviObje.imdb;

    var imdbPrgs = document.querySelector('progress');
    imdbPrgs.value = moviObje.imdb;


}
loadPageWithData();


var moveis = "";
async function loadMoviesPromise(){
    //var moveis = "";
    var myData = "";
    let p = new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        var myRes = "";
        req.open("GET", "movies.json");
        req.send("");
        req.addEventListener('readystatechange', function () {
            if (req.readyState == 4 && req.status == 200) {
                myRes = req.response;
                myData = JSON.parse(myRes);
                moveis = myData;
                resolve(myData);
            } if (req.status == 404)
                reject("Error While Fetching Data ");
        });
    
    });
    
    
    p.then(data => {
        moveis = data;
        loadSimilarMovies();
    }).catch(error => {
        console.log("Error" , error);
    });
};
loadMoviesPromise();

function loadSimilarMovies(){
    var moviePics = document.querySelectorAll('.similarMoviesImage');
    var similarMovies = moveis[getCookie('cat')];
    var moviObje = JSON.parse(localStorage.getItem('movie'));
    
    let iP1 = 0;
    let iP2 = 1;

    console.log(iP1);
    
    
    
    var movieKey = Object.keys(similarMovies[iP1]);
    var poster1 = similarMovies[iP1][movieKey[0]].poster
    var ip1Title = similarMovies[iP1][movieKey[0]].Title;
    
    var movieKey = Object.keys(similarMovies[iP2]);
    var ip2Title = similarMovies[iP2][movieKey[0]].Title;
    var poster2 = similarMovies[iP2][movieKey[0]].poster
    


    do {
        iP1 = Math.floor(Math.random() * 100) % similarMovies.length;
        iP2 = Math.floor(Math.random() * 100) % similarMovies.length;

        movieKey = Object.keys(similarMovies[iP1]);
        ip1Title = similarMovies[iP1][movieKey[0]].Title;

        movieKey = Object.keys(similarMovies[iP2]);
        ip2Title = similarMovies[iP2][movieKey[0]].Title;

        console.log(iP1 , iP2);
    } while (iP1 === iP2 || ip2Title == moviObje.Title || ip1Title == moviObje.Title);

    movieKey = Object.keys(similarMovies[iP1]);
    similarMovie1 = similarMovies[iP1][movieKey];
    console.log(similarMovie1);

    ip1Title = similarMovies[iP1][movieKey].Title;
    poster1 = similarMovies[iP1][movieKey].poster
    
    movieKey = Object.keys(similarMovies[iP2]);
    ip2Title = similarMovies[iP2][movieKey].Title;
    poster2 = similarMovies[iP2][movieKey].poster
    
    console.log('--------------------------------')
    similarMovie2 = similarMovies[iP2][movieKey];
    console.log(similarMovie2);

    moviePics[0].src = poster1;
    moviePics[1].src = poster2;
}


(function (){
    var moviePics = document.querySelectorAll('.similarMoviesImage');
    moviePics[0].addEventListener('click', function(){
        localStorage.setItem('movie' , JSON.stringify(similarMovie1));
        window.open('details.html', '_self');
    });

    moviePics[1].addEventListener('click', function(){
        localStorage.setItem('movie' , JSON.stringify(similarMovie2));
        window.open('details.html', '_self');
    });
})();