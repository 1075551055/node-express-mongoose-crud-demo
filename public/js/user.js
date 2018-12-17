function addLoadEvent(func) {
    var oldOnload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldOnload();
            func();
        }
    }
}

addLoadEvent(addUser);

function addUser() {
    // https://stackoverflow.com/questions/12765431/how-to-send-a-put-request-from-html-form-in-express-and-node
    $('#userForm').submit(function (e) {
        e.preventDefault();
        var url = '/users';
        $.ajax(url, {
            type: 'post',
            // server must response json data
            // dataType: 'json',
            headers: {
                // res.format
                Accept: 'application/json'
            },
            data: $('#userForm').serialize(),
            success: function (data) {
                if (data.success){
                    location = '/';
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                var errorHtml = template('errorMsg', xhr.responseJSON);
                var errorDiv = $('#errorDiv');
                errorDiv.removeClass('text-hide').html(errorHtml);
            }
        });
    })
}