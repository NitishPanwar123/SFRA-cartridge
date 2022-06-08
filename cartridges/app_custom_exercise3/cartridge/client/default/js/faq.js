
var btn1 = document.querySelector('#arrow1');
var btn2 = document.querySelector('#arrow2');

console.log(btn1);
console.log(btn2);


btn1.onclick = function(){
    console.log('click1');
    var img1 = document.getElementById('arrow1');
    var img2 = document.getElementById('arrow2');
    console.log(img1);
    img1.style.display = 'none';
    img2.style.display= 'inline';

}

btn2.onclick = function(){
    console.log('click2');
    var img1 = document.getElementById('arrow1');
    var img2 = document.getElementById('arrow2');
    console.log(img1);
    img1.style.display = 'inline';
    img2.style.display= 'none';

    var box= document.getElementById('collapseExample');
    // box.removeAttribute('class');
    box.setAttribute('class','collapse show');

}