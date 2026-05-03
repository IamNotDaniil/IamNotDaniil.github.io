const terminal_output = document.getElementById('terminal_output');
const terminal_form = document.getElementById('terminal_form');
const terminal_input = document.getElementById('terminal_input');

function add_terminal_line(text, cls = '') {
    const line = document.createElement('p');
    line.className = `term_line ${cls}`.trim();
    line.textContent = text;
    terminal_output.appendChild(line);
    terminal_output.scrollTop = terminal_output.scrollHeight;
}

function render_repo_lines() {
    const items = Array.from(document.querySelectorAll('#projects_list li a'));

    if (items.length === 0) {
        add_terminal_line('Нет репозиториев в кэше. Выполните /sync или кнопку SYNC.', 'term_warn');
        return;
    }

    add_terminal_line(`Найдено репозиториев: ${items.length}`, 'term_ok');
    items.forEach((repo) => add_terminal_line(`- ${repo.textContent}: ${repo.href}`));
}

function run_command(command) {
    switch (command) {
        case '/help':
            add_terminal_line('Команды: /help, /myrepos, /about, /contacts, /sync, /clear, /stats');
            break;
        case '/myrepos':
            render_repo_lines();
            break;
        case '/about':
            add_terminal_line('ĐØ₵₮ØⱤ ⱧɆ₦₮₳ł | C++, Python, SFML | Automation / Bots / Parsers');
            break;
        case '/contacts':
            add_terminal_line('Telegram: @IamNotDaniil');
            add_terminal_line('Email: friday2night2funking@gmail.com');
            break;
        case '/stats':
            add_terminal_line('Stats block: смотри секцию GITHUB STATS ниже на странице.');
            break;
        case '/sync':
            add_terminal_line('Выполняю синхронизацию GitHub...', 'term_ok');
            if (typeof load_projects === 'function') {
                load_projects().then(() => add_terminal_line('Синхронизация завершена.', 'term_ok'));
            }
            break;
        case '/clear':
            terminal_output.innerHTML = '';
            break;
        default:
            add_terminal_line(`Неизвестная команда: ${command}. Введите /help`, 'term_warn');
    }
}

terminal_form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = terminal_input.value.trim();

    if (!value) {
        return;
    }

    add_terminal_line(`> ${value}`);
    run_command(value);
    terminal_input.value = '';
});

add_terminal_line('YoRHa Terminal ready. Введите /help', 'term_ok');
