$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;
    // Make request to Github
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
        client_id:'e8a6bb4d73eb88e76cc4',
        client_secret:'40d23cf38f3559bc0de1eee10fea60a67131cc75'
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'e8a6bb4d73eb88e76cc4',
        client_secret:'40d23cf38f3559bc0de1eee10fea60a67131cc75',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well rounded">
              <div class="row">
                <div class="col-md-3">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-5">
                  <span class="label label-default">Forks: ${repo.forks_count}</span>
                  <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-default rounded right">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar rounded" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block rounded" href="${user.html_url}">View Profile</a>

                <form action="http://localhost:8080/Saurabh/Register" method="post">  
                <br>
                 <input type="hidden" name="varname" value="${user.name}" />
                <input type="hidden" name="varlink" value="${user.html_url}" />
                 <input type="submit" onclick="dbsuccess()" value="Add to ShortList" class="btn btn-success btn-block rounded"}"></button>
                 </form>

              </div>
              <div class="col-md-9">
              <span class="label label-default">Public Repos: ${user.public_repos}</span>
              <span class="label label-primary">Public Gists: ${user.public_gists}</span>
              <span class="label label-success">Followers: ${user.followers}</span>
              <span class="label label-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
      `);
    });
  });
});

function dbsuccess() {
    alert("Profile has been added to your DataBase.\nPress ok to continue!");
}