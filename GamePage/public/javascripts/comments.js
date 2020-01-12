// $(document).ready(function() {
//     let gameId = $("#game-id");

//     $("#comment-btn").on("click", function(e) {
//         e.preventDefault();
//     });

//     $("#comment-btn").on("click", function(e) {
//         $.ajax({
//             method: "POST",
//             url: `/games/${gameId}/comments`,
//             success: function(res) {
//                 let gameUser = $("#game-user");
//                 let commentUser = $("#comment-user");
//                 let userId = $("#user-id");
//                 let userAdmin = $("#user-admin");

//                 let newComment1 = `<table class="center">
//                                 <thead>
//                                     <tr>
//                                 <th><%= comment.name %></th>`;

//                 if (userId == gameUser || userId == commentUser || userAdmin) {
//                     newComment1 += `<th class="small"></th>`;
//                 }

//                 newComment1 += `</tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                 <td class="align"><%= comment.description %></td>`;

//                 if (userId == gameUser || userId == commentUser || userAdmin) {
//                     newComment1 += `<td class="small">
//                                 <form action="/games/<%= game._id %>/comments/<%= comment._id %>?_method=DELETE" method="POST">
//                                     <input class="btn waves-effect waves-light" type="submit" value="Delete" />
//                                 </form>
//                             </td>`;
//                 }

//                 newComment1 += `</tr>
//                     </tbody>
//                 </table>
//                 <br />
//                 <br />`;
//                 $("#my-comments").append(newComment1);
//             },
//             error: function(res) {
//                 console.log("error");
//             }
//         });
//     });
// });
