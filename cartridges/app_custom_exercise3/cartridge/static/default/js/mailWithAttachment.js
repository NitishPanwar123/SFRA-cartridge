$(document).ready(function(){
    var fileName;
    $(".mail-attachment").change(function (e) {
        var file = e.target.files[0];
        fileName = e.target.files[0].name;
        var reader = new FileReader();
        reader.onload = function (e) {
            $(".base64").val(e.target.result);
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    });
    $('.button').click(function(){
        var required = true;
        if(!$('.mail-body').val().length){
            required = false;
            alert('Please write something in mail body.');
        }
        if(!$('.mail-attachment').get(0).files.length){
            required = false;
            alert('Please upload any file.');
        }

        if(required){
            // $('#mailForm').submit();
            var base64 = $(".base64").val();
            var obj = {};
            obj.data = base64;
            obj.name = fileName;
            obj.body = $('.mail-body').val();
            $.ajax({
                type: 'POST',
                url: 'Mail-Submit',
                data: obj,
                // contentType: 'application/json; charset=utf-8',
                // dataType: 'json',
                beforeSend: function(){
                    $('.button').css("pointer-events","none");
                },
                success: function(res){
                    alert("Mail Send");
                    $('.button').css("pointer-events","unset");
                },
                error: function(){
                    alert("Mail can't be send");
                    $('.button').css("pointer-events","unset");
                }
            });
        }
    })

    
    // $("#mailForm").on('submit', function(e){
    //     e.preventDefault();
    //     $.ajax({
    //         type: 'POST',
    //         url: 'Mail-Submit',
    //         data: new FormData(this),
    //         dataType: 'json',
    //         contentType: false,
    //         cache: false,
    //         processData:false,
    //         beforeSend: function(){
    //             $('.button').css("pointer-events","none");
    //         },
    //         success: function(res){
    //             alert("Mail Send");
    //             $('.button').css("pointer-events","unset");
    //         },
    //         error: function(){
    //             alert("Mail can't be send");
    //             $('.button').css("pointer-events","unset");
    //         }
    //     });
    // });
})