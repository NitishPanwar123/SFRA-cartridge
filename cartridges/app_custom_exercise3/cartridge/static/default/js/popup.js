var week;

function handleChange()
{
    console.log('hii');
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementById("close");
    modal.style.display = "block";

      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

}

function weekHandler()
{
     week = document.getElementById("weeks").value;
    console.log(week);

   

}

function chg()
{
    console.log(week);
    var url = 'https://zydf-004.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-nitish-Site/en_US/HelloV3-Start?store='+week;
                    $.ajax({
                        type: 'GET',
                    url: url,
                    success: function(data, xhr, status) {
                       
                        console.log('ajax called');
                        console.log('ajax called2');
                    },
                    error: function(xhr, textStatus, error) {
                        console.log('2 ' + JSON.stringify(xhr));
                        console.log('3 ' + textStatus);
                        console.log('4 ' + error);
                        console.log('1 ' + textStatus.data);
                    }
                });
}