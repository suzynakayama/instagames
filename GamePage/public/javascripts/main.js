$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: "/api/games/all",
        success: function(res) {
            for (let i = 0; i < res.length; i++) {
                const imgItem = res[i].image;
                const gameHTML = `<img class="carousel-item" src=${imgItem} />`;

                $(".carousel").append(gameHTML);
            }
            $(".carousel").carousel({
                indicators: true
            });
        },
        error: function(res) {
            console.log("error");
            const err = "Sorry, something went wrong.";
            $(".carousel").append(err);
        }
    });
});
