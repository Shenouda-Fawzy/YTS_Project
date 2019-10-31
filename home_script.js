
// Creating A promise
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
    
    
    await p.then(data => {
        console.log("hi");
        moveis = data;
        loadHomeWithMovies();
    }).catch(error => {
        console.log("Error");
    });
    //console.log("After fetching data");
}

loadMoviesPromise();

function loadHomeWithMovies(){
    var divs = document.querySelectorAll('#bodyTwoDivId');
    var imgs = document.querySelectorAll('img');
    var imgDivs = document.querySelectorAll('.moviePosterDivClass');

    var movieObj = { }
    let j = 0;
    var m = 0;
    var catKeys = Object.keys(moveis);
    console.log(moveis[catKeys[0]]);
    for(let i = 0 ; i < imgs.length ; i++){
        j = i % catKeys.length;
        m = i % moveis[catKeys[j]].length ;
        var catigory = catKeys[j].toString(); // Get catigory
        movieObj = moveis[catigory][m]; // Get Single Movie in catigory
        var mvKey = Object.keys(movieObj).toString();
        var imgSrc = movieObj[mvKey]["poster"];
        imgDivs[i].setAttribute('key',mvKey);
        //imgs[i].setAttribute('key',mvKey);
        imgs[i].src = imgSrc;
    }
}

function addingClickEventOnMovie(){
    var divs = document.querySelectorAll('.moviePosterDivClass');
    for(let i = 0 ; i < divs.length ; i++){
        divs[i].addEventListener('click',gotDetailsPage);
    }
}

addingClickEventOnMovie();

function gotDetailsPage(e){

    var element = e.target;
    var tg = e.toElement.tagName;
    var movieKey = "";
    switch(tg){
        case "IMG":
        case "INPUT":
            var parent = element.parentNode;
            movieKey = parent.getAttribute('key');
            console.log(movieKey);
            break;
        case "DIV":
            movieKey = element.getAttribute('key');
            console.log(movieKey)
            break;
        default:
            ;
    }
}

