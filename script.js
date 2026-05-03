const STORAGE_KEY = 'profile_github_username';
const projects_list = document.getElementById('projects_list');
const refresh_button = document.getElementById('refresh_projects');
const github_username_input = document.getElementById('github_username');
const projects_status = document.getElementById('projects_status');

function set_loading_state(is_loading) {
    refresh_button.disabled = is_loading;
    refresh_button.textContent = is_loading ? 'Загрузка...' : 'Обновить проекты';
}

function render_projects(repos) {
    projects_list.innerHTML = '';

    repos.forEach((repo) => {
        const item = document.createElement('li');
        const title = document.createElement('a');
        const description = document.createElement('p');

        title.href = repo.html_url;
        title.target = '_blank';
        title.rel = 'noreferrer';
        title.textContent = repo.name;

        description.textContent = repo.description || 'Описание не указано.';

        item.appendChild(title);
        item.appendChild(description);
        projects_list.appendChild(item);
    });
}

async function load_projects() {
    const username = github_username_input.value.trim();

    if (!username) {
        projects_status.textContent = 'Введите GitHub username.';
        projects_list.innerHTML = '';
        return;
    }

    localStorage.setItem(STORAGE_KEY, username);
    set_loading_state(true);
    projects_status.textContent = 'Загрузка...';

    try {
        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const repos = await response.json();
        const public_repos = repos.filter((repo) => !repo.fork);

        if (public_repos.length === 0) {
            projects_list.innerHTML = '';
            projects_status.textContent = 'Публичные проекты не найдены.';
            return;
        }

        render_projects(public_repos);
        projects_status.textContent = `Найдено проектов: ${public_repos.length}`;
    } catch (error) {
        projects_list.innerHTML = '';
        projects_status.textContent = 'Ошибка загрузки. Проверь username и попробуй снова.';
    } finally {
        set_loading_state(false);
    }
}

function init_saved_username() {
    const saved_username = localStorage.getItem(STORAGE_KEY);

    if (saved_username) {
        github_username_input.value = saved_username;
    }
}

refresh_button.addEventListener('click', load_projects);
init_saved_username();
load_projects();
