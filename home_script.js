
// Creating A promise
var moveis = "";
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
    console.log("hi");
    moveis = data;
}).catch(error => {
    console.log("Error");
});


window.addEventListener('load', function () {

    var divs = document.querySelectorAll('#bodyTwoDivId');
    var imgs = document.querySelectorAll('img');


    var movieObj = { }
    //console.log(moveis);
    let ac = moveis["Action"];
    let animationCat = moveis["Animation"];
    let romanceCat = moveis["Romance"];
    
    // console.log(ac[0]);
    let j = 0;
    var m = 0;
    var catKeys = Object.keys(moveis);
    // console.log(catKeys[0]);
    console.log(moveis[catKeys[0]]);
    for(let i = 0 ; i < imgs.length ; i++){
        j = i % catKeys.length;
        m = i % moveis[catKeys[j]].length ;
        var catigory = catKeys[j].toString(); // Get catigory
        movieObj = moveis[catigory][m]; // Get Single Movie in catigory
        var mvKey = Object.keys(movieObj).toString();
        var imgSrc = movieObj[mvKey]["poster"];
        imgs[i].setAttribute('key',mvKey);
        imgs[i].src = imgSrc;
    }

});
