# GitHub Finder

## Project Description
GitHub Finder is a web application built with pure vanilla JavaScript that allows users to search for GitHub profiles and view their information along with their repositories. The app utilizes the official GitHub API to fetch user data and display it in a clean, responsive interface.

## Features
- Search for any GitHub user by username
- View user profile information including:
- Avatar
- Name
- Bio
- Location
- Public repositories count
- Blog/website link

Browse user's public repositories with:
- Repository name
- Description
- Technologies used
- Star and fork counts
- Responsive design that works on mobile and desktop
- Error handling for invalid usernames


## Technologies Used
- HTML5
- CSS3 (with Flexbox for layout)
- Vanilla JavaScript (ES6+)
- GitHub REST API (v3)
- Fetch API for HTTP requests

## How to Use
1.Enter a GitHub username in the search field
2.Click search
3.View the user's profile information and repositories

**Click on any repository name to visit it on GitHub**

Setup Instructions
To run this project locally:

* Clone the repository:
* bash
* git clone https://github.com/gabrielfabiao/github-finder.git
* Open the project folder
* Open index.html in your browser
(No dependencies or build steps required as this is pure vanilla JS)

## API Usage Notes
This project uses the public GitHub API with the following endpoints:

- User data: https://api.github.com/users/{username}
- User repos: https://api.github.com/users/{username}/repos

## Future Improvements
- Add pagination for repositories
- Implement local storage to save recent searches
- Add dark/light mode toggle
- Include more user statistics and charts
- Add sorting options for repositories

License
MIT - Feel free to use and modify this project
