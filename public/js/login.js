$("#login-form").on("submit", (e) => {
    e.preventDefault();
    var email = $("#login-email").val();
    var passw = $("#login-password").val();

    $.post(
        "/itru/login",
        {"email": email, "password": passw},
        (data) => {
            $("#login-message").html(data.status);
        },
        "json"
    ).fail((mess) => {
        $("#login-message").html(`ERROR: ${mess.status}`);
    });
})
