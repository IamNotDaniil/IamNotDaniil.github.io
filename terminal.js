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

function print_about() {
    print_line('IamNotDaniil profile:', 'ok');
    print_line('- Developer');
    print_line('- Stack: C++, Python, SFML');
    print_line('- Focus: automation, bots, parsers, scripts');
    print_line('- Also builds web/e-commerce projects');
}

function print_help() {
    print_line('Available commands:', 'ok');
    print_line('/help       - show commands list');
    print_line('/about      - info about IamNotDaniil');
    print_line('/myrepos    - list GitHub repos');
    print_line('/sync       - sync repos from GitHub API');
    print_line('/contacts   - telegram + email');
    print_line('/stats      - profile links');
    print_line('/clear      - clear terminal output');
}

async function run_command(command) {
    switch (command) {
        case '/help':
            print_help();
            break;
        case '/about':
            print_about();
            break;
        case '/myrepos':
            print_repo_list();
            break;
        case '/sync':
            print_line('Sync started...', 'ok');
            await load_projects();
            print_line('Sync done.', 'ok');
            break;
        case '/contacts':
            print_line('Telegram: @IamNotDaniil');
            print_line('Email: friday2night2funking@gmail.com');
            break;
        case '/stats':
            print_line('GitHub: https://github.com/IamNotDaniil', 'link');
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
    if (!command) {
        return;
    }

    print_line(`IamNotDaniil@terminal ~/profile ❯ ${command}`);
    terminal_input.value = '';
    await run_command(command);
});

print_line('Terminal ready. Type /help', 'ok');
