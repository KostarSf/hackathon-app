var user_email = "";
var user_password = "";

$("#reg-form-1").on("submit", (e) => {
    e.preventDefault();
    let no_errors = true;

    user_email = $("#reg-email").val();
    user_password = $("#reg-password").val();

    if ($("#university_name").val() === null || $("#university_name").val() === "0") {
        no_errors = false;
    }

    if ($("#reg-password").val() !== $("#reg-password2").val()) {
        $("#reg-password").val("");
        $("#reg-password2").val("");
        alert("Введённый вами пароль не совпадает!");
        no_errors = false;
    }

    if ($("#reg-password").val().length < 4) {
        alert("Пароль должен быть минимум 4 символа длиной");
        $("#reg-password").val("");
        $("#reg-password2").val("");
        no_errors = false;
    }

    if (no_errors) {
        $("#reg_screen_1").addClass("screen_hide");
        $("#reg_screen_2").removeClass("screen_hide");
    }
})

$("#reg-form-2").on("submit", (e) => {
    e.preventDefault();

    let fio = $("#reg-fio").val();
    let acc_type = $("input[name='user-type']:checked").val();

    console.log(acc_type);

    $.post(
        "/itru/register",
        { "email": user_email, "password": user_password},
        (data) => {
            if (data.status === "passed") {
                window.location.href = "current_day";
            } else if (data.status === "denied") {
                alert(data.message);
            }
        }
    );
});
