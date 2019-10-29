var homeBtn=document.querySelector('#homeBtn')
var loginBtn=document.querySelector('#loginBtn')
var registerBtn=document.querySelector('#registerBtn')

homeBtn.addEventListener('mouseenter',function(){
    homeBtn.style.color="white";
})
homeBtn.addEventListener('mouseleave',function(){
    homeBtn.style.color= "#3c3c3c";
})
loginBtn.addEventListener('mouseenter',function(){
    loginBtn.style.color="#3c3c3c";
})
loginBtn.addEventListener('mouseleave',function(){
    loginBtn.style.color= "white";
})
registerBtn.addEventListener('mouseenter',function(){
    registerBtn.style.color="#3c3c3c";
})
registerBtn.addEventListener('mouseleave',function(){
    registerBtn.style.color= "white";
})