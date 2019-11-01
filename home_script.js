
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
        //console.log("hi");
        moveis = data;
        loadHomeWithMovies();
    }).catch(error => {
        console.log("Error");
    });
    //console.log("After fetching data");
}

loadMoviesPromise();

function loadHomeWithMovies(){
    var imgs = document.querySelectorAll('img');
    var imgDivs = document.querySelectorAll('.moviePosterDivClass');

    var movieObj = { }
    let j = 0;
    var catKeys = Object.keys(moveis);
    let counter = 0;
    let moviIndex = 0;

// This loop will load a single movie from each catigory in parallel
// cat: 0, movi: 0
// cat: 1, movi: 0
// cat: 2, movi: 0
// cat: 0, movi: 1
// cat: 1, movi: 1
// cat: 2, movi: 1
// cat: 0, movi: 2
    
    for(let i = 0 ; i < imgs.length ; i++){
        j = i % catKeys.length;
        if(counter >= catKeys.length){
            moviIndex++;
            counter = 0;
        }
        var catigory = catKeys[j].toString(); // Get catigory
        movieObj = moveis[catigory][moviIndex]; // Get Single Movie in catigory
        var mvKey = Object.keys(movieObj).toString();
        var imgSrc = movieObj[mvKey]["poster"];
        imgDivs[i].setAttribute('key',mvKey);
        imgDivs[i].setAttribute('cat',catigory);
        imgDivs[i].setAttribute('inx',moviIndex);
        //imgs[i].setAttribute('key',mvKey);
        imgs[i].src = imgSrc;
        counter++;
    }
}

(function addingClickEventOnMovie(){
    var divs = document.querySelectorAll('.moviePosterDivClass');
    for(let i = 0 ; i < divs.length ; i++){
        divs[i].addEventListener('click',gotDetailsPage);
    }
})();

//addingClickEventOnMovie();

function gotDetailsPage(e){

    var element = e.target;
    var tg = e.toElement.tagName;
    var movieKey = "";
    var catKey = "";
    var indx = "";
    var movieObj = {}; 
    switch(tg){
        case "IMG":
        case "INPUT":
            var parent = element.parentNode;
            movieKey = parent.getAttribute('key');
            catKey = parent.getAttribute('cat');
            indx = parent.getAttribute('inx');
            movieObj = moveis[catKey][indx][movieKey];
            localStorage.setItem('movie' , JSON.stringify(movieObj));
            setCookie('key', movieKey);
            setCookie('cat',catKey);
            var mv = window.open('details.html','_self');
            console.log(e.target);
            break;
        case "DIV":
            movieKey = element.getAttribute('key');
            catKey = element.getAttribute('cat');
            indx = element.getAttribute('inx');
            movieObj = moveis[catKey][indx][movieKey];
            localStorage.setItem('movie' , JSON.stringify(movieObj));
            setCookie('key', movieKey);
            setCookie('cat',catKey);
            var mv = window.open('details.html','_self'); //console.log(mv);
            break;
        default:
            console.log(e);
            break;
    }
}

