var issueContainerEl = document.getElementById("issue-container");

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    //create link element for each issues
    for (var i = 0; i < issues.length; i++) {
        //create link to take users to issue on Github
        var issueEl = document.createElement('a');
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        var titleEl = document.createElement('span');
        titleEl.textContent = issues[i].title;
        issueEl.appendChild(titleEl);
        var typeEl = document.createElement('span');
        //checking if it's an issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
};

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });
};

getRepoIssues("agoetz4407/code-quiz");