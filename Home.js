var loginBtn=document.querySelector('#loginBtn')
var registerBtn=document.querySelector('#registerBtn')


loginBtn.addEventListener('mouseenter',function(){
    loginBtn.style.color="#f08080";
})
loginBtn.addEventListener('mouseleave',function(){
    loginBtn.style.color= "white";
})
registerBtn.addEventListener('mouseenter',function(){
    registerBtn.style.color="#f08080";
})
registerBtn.addEventListener('mouseleave',function(){
    registerBtn.style.color= "white";
})