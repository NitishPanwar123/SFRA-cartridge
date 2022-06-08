console.log('successfaq');
var btn3 = document.querySelector('#arrow3');
var btn4 = document.querySelector('#arrow4');

console.log(btn3);
console.log(btn4);


btn3.onclick = function(){
    console.log('click1');
    var img3 = document.getElementById('arrow3');
    var img4 = document.getElementById('arrow4');
  
    img3.style.display = 'none';
    img4.style.display= 'inline';

}

btn4.onclick = function(){
    console.log('click2');
    var img3 = document.getElementById('arrow3');
    var img4 = document.getElementById('arrow4');
    
    img3.style.display = 'inline';
    img4.style.display= 'none';

    var box= document.getElementById('collapseExample');
    // box.removeAttribute('class');
    box.setAttribute('class','collapse show');

}