const logo = document.querySelector('.logo_github');
const searchBar = document.querySelector('#search_bar');
const searchButton = document.querySelector('.search_icon');
const nameInput = document.querySelector('#search_bar-input');
const infoSection = document.querySelector('.user_profile');
const repositoriesSection = document.querySelector('.user_repositories');

searchButton.addEventListener('click', handleSearch);
logo.addEventListener('click', resetSearch);

async function handleSearch() {
    const userId = nameInput.value.trim();
    
    if (!userId) {
        alert('Please enter a GitHub username');
        return;
    }

    logo.style.top = '120px';
    searchBar.style.display = 'none';
    
    try {
        const userData = await fetchUserData(userId);
        displayUserProfile(userData);
        
        const repos = await fetchRepositories(userId);
        displayRepositories(repos, userId);
        
        infoSection.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch user data. Please try again.');
        resetSearch();
    }
}

async function fetchUserData(userId) {
    const response = await fetch(`https://api.github.com/users/${userId}`);
    if (!response.ok) {
        throw new Error('User not found');
    }
    return await response.json();
}

async function fetchRepositories(userId) {
    const response = await fetch(`https://api.github.com/users/${userId}/repos`);
    if (!response.ok) {
        throw new Error('Failed to fetch repositories');
    }
    return await response.json();
}

function displayUserProfile(userData) {
    const elements = document.querySelectorAll('.userInfo');
    
    elements.forEach(element => {
        const parent = element.parentElement;
        const value = userData[element.id];
        
        if (value === null || value === '') {
            parent.style.display = 'none';
            return;
        }
        
        parent.style.display = 'flex';
        
        switch(element.tagName) {
            case 'IMG':
                element.src = userData.avatar_url;
                break;
            case 'A':
                if (element.id === 'twitter_username') {
                    element.href = `https://x.com/${userData.twitter_username}`;
                    element.innerHTML = '<img src="./assets/imgs/x_icon.png" class="x_link">';
                } else if (element.id === 'git_button') {
                    element.href = `https://github.com/${nameInput.value.trim()}`;
                } else {
                    element.href = value;
                    element.textContent = value;
                }
                break;
            case 'P':
            case 'H1':
            case 'H2':
                if (element.id === 'created_at') {
                    const date = new Date(userData.created_at);
                    element.textContent = date.toLocaleDateString();
                } else {
                    element.textContent = value;
                }
                break;
        }
    });
}

function displayRepositories(repos, userId) {
    repositoriesSection.innerHTML = '';
    
    if (repos.length === 0) {
        repositoriesSection.innerHTML = '<p>No repositories found</p>';
        return;
    }
    
    const reposToShow = repos.slice(0, 6);
    
    reposToShow.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.className = 'repository';
        repoElement.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || 'No description available'}</p>
            <div class="repo-meta">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
                ${repo.language ? `<span>📝 ${repo.language}</span>` : ''}
            </div>
        `;
        repositoriesSection.appendChild(repoElement);
    });
    
    if (repos.length > 6) {
        const viewAllButton = document.createElement('a');
        viewAllButton.href = `https://github.com/${userId}?tab=repositories`;
        viewAllButton.target = '_blank';
        viewAllButton.className = 'view-all-button';
        viewAllButton.textContent = `View All (${repos.length})`;
        repositoriesSection.appendChild(viewAllButton);
    }
}

function resetSearch() {
    logo.style.top = '250px';
    searchBar.style.display = 'flex';
    infoSection.style.display = 'none';
    nameInput.value = '';
}