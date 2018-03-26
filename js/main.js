$(document).ready(() => {
  $('#searchUser').on('keyup', (e) => {
    let username = e.target.value;

    // MAKE REQUEST TO GITHUB
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '466e1551fe82ef7e1446',
        client_secret: '08fb2dedf1484526b6efcea16c829e645aa1feb8'
      }
    }).done((user) => {
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: '466e1551fe82ef7e1446',
          client_secret: '08fb2dedf1484526b6efcea16c829e645aa1feb8',
          sort: 'created: asc',
          //per_page: 5
        }
      }).done((repos) => {
        $.each(repos, (index, repo) => {
          $('#repos').append(`
                   <div class="well">
                     <div class="row">
                       <div class="col-md-7">
                         <ul class="list-group">
                          <li class="list-group-item">Name: <div class="bold">${repo.name}</div></li>
                            <li class="list-group-item">Description: ${repo.description}</li>
                            <li class="list-group-item">Created On: ${repo.created_at}</li>
                            <li class="list-group-item">Last Updtaed On: ${user.updated_at}</li>
                          </ul>
                       </div>
                       <div class="col-md-3">
                         <span class="label label-default">Forks: ${repo.forks_count}</span>
                         <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                         <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                       </div>
                       <div class="col-md-2">
                         <a href="${repo.html_url}" target="_blank" class="btn btn-dark btn-block">Visit</a>
                       </div>
                     </div>
                   </div>
                 `);
        });
      });

      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.login}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="label label-default">Public Repositories: ${user.public_repos}</span>
                <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                <span class="label label-success">Followers: ${user.followers}</span>
                <span class="label label-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/Blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <br><br>
        <h3 class="page-header">Repositories</h3>
        <div id="repos"></div>
      `);
    });
  });
});
