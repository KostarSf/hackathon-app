$("#login-form").on("submit", (e) => {
    e.preventDefault();
    var email = $("#login-email").val();
    var passw = $("#login-password").val();

    $.post(
        "/itru/login",
        {"email": email, "password": passw},
        (data) => {
            if (data.status === 'passed') {
                window.location.href = "current_day";
            } else {
                alert(data.status);
            }

        },
        "json"
    ).fail((mess) => {
        alert(mess.status);
    });
})
