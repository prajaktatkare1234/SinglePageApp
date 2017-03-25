$(document).ready(function() {
    if (sessionStorage.getItem('name') !== null) {
        welcome();

    }
    $(document).on("click", "#s", (function() {
        sessionStorage.removeItem("name");
        logout();
        // window.location.hash="";
        location.reload();
        return;
    }));

    $("#reg").click(function() {


        var name = $('#name').val();
        var email = $('#email').val();
        var pwd = $('#pwd').val();
        console.log(pwd);

        var repwd = $('#repwd').val();
        console.log(repwd);
        if (pwd == repwd) {

            var obj = {
                name: name,
                email: email,
                pwd: pwd,
                repwd: repwd
            };

            var temp = JSON.parse(localStorage.getItem("data")) || [];
            temp.push(obj);
            localStorage.setItem("data", JSON.stringify(temp));
            logout();
            //alert("ghfhj");
        } else {
            alert("passwords are not same");
        }
    });

    $('#name').keyup(function() {
        $('span.error').remove();
        var inputVal = $(this).val();
        var name = /[a-zA-Z]/;
        if (!name.test(inputVal)) {
            $(this).after('<span class="error">Enter name correctly</span>');
        }
    });


    $('#email').keyup(function() {
        $('span.error').remove();
        var inputVal = $(this).val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(inputVal)) {
            $(this).after('<span class="error">Invalid Email </span>');
        }
    });




    $('#log').click(function() {
        //alert("hii");
        var User = localStorage.getItem("data");
        var UserObject = JSON.parse(User);
        for (var i in UserObject) {
            // alert("hii");
            console.log(UserObject[i]);
            if (UserObject[i].name == $("#Username").val() && UserObject[i].pwd == $("#lpwd").val()) {
                var uname = $("#Username").val();
                console.log(uname);
                sessionStorage.setItem("name", uname);

                alert("logged in successfully");
                welcome();
                break;
            }
        }

        if (UserObject[i].name !== $("#Username").val() && UserObject[i].pwd !== $("#lpwd").val()) {
            alert("invalid user");
            document.getElementById("Username").value = "";
            document.getElementById("lpwd").value = "";
        }
    });

    function logout()

    {
        // sessionStorage.removeItem("name");
        $.ajax({
            url: "index.html",
            type: "GET",
            datatype: "html",
            success: function(response) {
                console.log('the page was loaded', response);
                $('body').html(response);
            },
            error: function(error) {
                console.log('the page was not loaded', response);
            },
            complete: function(xhr, status) {
                console.log("the request is complete!");
            },

        });
    }

});

function welcome() {
    // alert("hii");
    $.ajax({
        url: "html/welcome.html",
        type: "GET",
        datatype: "html",
        success: function(response) {
            console.log('the page was loaded', response);
            $('body').html(response); // sessionStorage.removeItem("name")
            console.log('the page was not loaded', response);
        },
        complete: function(xhr, status) {
            console.log("the request is complete!");
        },

    });
}
