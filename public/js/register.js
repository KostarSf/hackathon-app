$("#reg-form-1").on("submit", (e) => {
    e.preventDefault();

    if ($("#university_name").val() !== null && $("#university_name").val() !== "0") {
        $("#reg_screen_1").addClass("screen_hide");
        $("#reg_screen_2").removeClass("screen_hide");
    }
})

$("#reg-form-2").on("submit", (e) => {
    e.preventDefault();
    window.location.href = "current_day";
});
