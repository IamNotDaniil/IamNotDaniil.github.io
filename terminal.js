const terminal_output = document.getElementById('terminal_output');
const terminal_form = document.getElementById('terminal_form');
const terminal_input = document.getElementById('terminal_input');

function print_line(text, cls = 'info') {
    const p = document.createElement('p');
    p.className = `line ${cls}`;
    p.textContent = text;
    terminal_output.appendChild(p);
    terminal_output.scrollTop = terminal_output.scrollHeight;
}

function print_repo_list() {
    const repos = Array.from(document.querySelectorAll('#projects_list li a'));
    if (repos.length === 0) {
        print_line('No cached repos. Run /sync first.', 'warn');
        return;
    }

    print_line(`Repositories (${repos.length}):`, 'ok');
    repos.forEach((repo) => print_line(`- ${repo.textContent} :: ${repo.href}`, 'link'));
}

function print_help() {
    print_line('Available commands:', 'ok');
    print_line('/help       - show commands');
    print_line('/myrepos    - list repos from GitHub cache');
    print_line('/sync       - sync repos from GitHub API');
    print_line('/about      - short bio');
    print_line('/contacts   - contact links');
    print_line('/stats      - quick stats links');
    print_line('/clear      - clear terminal output');
}

async function run_command(command) {
    switch (command) {
        case '/help':
            print_help();
            break;
        case '/myrepos':
            print_repo_list();
            break;
        case '/sync':
            print_line('Sync started...', 'ok');
            await load_projects();
            print_line('Sync done.', 'ok');
            break;
        case '/about':
            print_line('ĐØ₵₮ØⱤ ⱧɆ₦₮₳ł | C++ / Python / SFML | Automation developer.');
            break;
        case '/contacts':
            print_line('Telegram: @IamNotDaniil');
            print_line('Email: friday2night2funking@gmail.com');
            break;
        case '/stats':
            print_line('https://github.com/IamNotDaniil', 'link');
            print_line('https://github-readme-stats.vercel.app/api?username=IamNotDaniil', 'link');
            break;
        case '/clear':
            terminal_output.innerHTML = '';
            break;
        default:
            print_line(`Unknown command: ${command}`, 'err');
            print_line('Type /help to see available commands.', 'warn');
    }
}

terminal_form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const command = terminal_input.value.trim();
    if (!command) return;
    print_line(`doctor@yorha ~/portfolio ❯ ${command}`);
    terminal_input.value = '';
    await run_command(command);
});

print_line('Welcome to Oh-My-Zsh Portfolio Terminal', 'ok');
print_line('Type /help to start.', 'info');
