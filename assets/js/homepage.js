var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var reposContainerEl = document.querySelector("#repos-container");
var reposSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.getElementById("language-buttons");

var buttonClickHandler = function(event) {
    var language = event.target.getAttribute("data-language");
    if (language) {
        getFeaturedRepos(language);
        reposContainerEl.textContent = "";
    }
};

//finding featured repos by language
var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language)
            });
        }
        else {
            alert("Error: Github user not found");
        }
    });
};

var displayRepos = function(repos, searchTerm) {
    //clear old content
    reposContainerEl.textContent = "";
    reposSearchTerm.textContent = searchTerm;
    //check if API returned any repos for user
    if (repos.length === 0) {
        reposContainerEl.textContent = "No repositories found";
        return;
    }

    //looping over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        //create span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        repoEl.appendChild(titleEl);

        //create status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //for loop to check for issues
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        repoEl.appendChild(statusEl);
        //append to container
        reposContainerEl.appendChild(repoEl);
    }
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a Github username");
    }
};


var getUserRepos = function(user) {
    //format github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
   fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
            displayRepos(data, user);
            })
        }
        else {
            alert("Error: Github User Not Found");
        }

   })
   .catch(function(error) {
       alert("Unable to connect to Github");
       console.log(error);
   })
};

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);