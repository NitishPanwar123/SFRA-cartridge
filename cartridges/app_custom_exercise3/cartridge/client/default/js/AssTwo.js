console.log('hy');
var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementById("close");
  

    btn.onclick = function() {
        modal.style.display = "block";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

var options = document.getElementById('weeks');

options.onchange= function()
{
    console.log(options.value);
    week =options.value;
}

// var submitbtn = document.getElementById('abc');
// submitbtn.onclick=function()
// {
//     console.log('hit');
//     console.log(week);
// }

span.onclick = function() {
    modal.style.display = "none";
    console.log(week);
    var url = 'https://zydf-004.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-nitish-Site/en_US/HelloV3-Show?store='+week;
    console.log(url);
                        $.ajax({
                            type: 'GET',
                        url: url,
                        success: function (data, xhr, status) {
    
                            console.log('success');

                        },
                        error: function (xhr, textStatus, error) {
                            console.log(error);
                        }
                    });

  }