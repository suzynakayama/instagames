$(document).ready(function() {
    let games = [];

    $.ajax({
        method: "GET",
        url: "/api/games/all",
        success: function(res) {
            games = res;
        },
        error: function(res) {
            console.log("error");
        }
    });

    $("#game-search-form").on("submit", function(e) {
        e.preventDefault();
    });

    $("#gameSearch").on("input", function(e) {
        const search = $(this).val();
        const re = new RegExp(search, "i");
        const filteredGames = games.filter(game => re.test(game.name));

        const html = filteredGames.map(game => {
            return `
            <div class="flex-item">
                <div class="card">
                    <div class="card-image">
                        <img src="${game.image}" />
                        <div class="card-title-div">
                            <div class="card-title"> ${game.name} </div>
                        </div>
                        <a
                        class="btn-floating halfway-fab waves-effect waves-light red"
                        href="/games/ ${game._id} "
                        ><i class="material-icons">Info</i></a
                        >
                    </div>
                    <div class="card-content">
                        <p> ${game.description} </p>
                    </div>
                    <div class="card-action">
                        <a href=" ${game.link}" target="_blank">Play!</a>
                    </div>
                </div>
            </div>`;
        });

        $("#display-games").html("");
        $("#display-games").html(html);
    });
});
