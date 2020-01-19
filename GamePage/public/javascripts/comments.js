//$(document).ready(function() {
let gameId = $("#game-id").text();

console.log("inside js");

$("#comment-btn").on("click", function(e) {
    e.preventDefault();

    $.ajax({
        method: "GET",
        url: `/api/games/${gameId}/comments`,
        data: {
            description: $("#description").val()
        },
        dataType: "json",
        success: function(res) {
            let gameUser = $("#game-user");
            let commentUser = $("#comment-user").text();
            let userId = $("#user-id").text();
            let userAdmin = $("#user-admin").text();

            let newComment1 = `<table class="center">
                                <thead>
                                    <tr>
                                <th>${res.name}</th>`;

            if (userId == gameUser || userId == commentUser || userAdmin) {
                newComment1 += `<th class="small"></th>`;
            }

            newComment1 += `</tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td class="align">${res.description}</td>`;

            if (userId == gameUser || userId == commentUser || userAdmin) {
                newComment1 += `<td class="small">
                                <form action="/games/${gameId}/comments/${res._id}?_method=DELETE" method="POST">
                                    <input class="btn waves-effect waves-light" type="submit" value="Delete" />
                                </form>
                            </td>`;
            }

            newComment1 += `</tr>
                    </tbody>
                </table>
                <br />
                <br />`;
            $("#my-comments").append(newComment1);
        },
        error: function(res) {
            console.log("error");
            console.log(res);
        }
    });
});
//});
