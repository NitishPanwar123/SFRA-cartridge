var btn1 = document.querySelector('.getLink');
var link = btn1.getAttribute('data-link');
console.log(btn1);


console.log(link);
btn2= document.querySelector('.shopNowbtn');


btn2.onclick = function(){
    console.log(link);
    location.replace(link);
}
