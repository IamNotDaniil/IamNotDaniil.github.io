const boot_overlay = document.createElement('div');
boot_overlay.className = 'boot_overlay';
boot_overlay.innerHTML = `
    <div class="boot_panel">
        <p class="boot_title">LOADING...BOOTING SYSTEM...</p>
        <p>Initializing terminal session...</p>
        <div class="progress"><span id="boot_bar"></span></div>
    </div>
`;
document.body.appendChild(boot_overlay);

const boot_bar = document.getElementById('boot_bar');
let progress_value = 0;
const timer = setInterval(() => {
    progress_value += 4;
    boot_bar.style.width = `${Math.min(progress_value, 100)}%`;
    if (progress_value >= 100) {
        clearInterval(timer);
        boot_overlay.classList.add('hide');
        setTimeout(() => boot_overlay.remove(), 650);
    }
}, 70);

function type_header() {
    const header = document.querySelector('.boot_line');
    if (!header) {
        return;
    }

    const full_text = header.dataset.fullText || header.textContent;
    header.textContent = '';
    let idx = 0;

    const type_timer = setInterval(() => {
        idx += 1;
        header.textContent = full_text.slice(0, idx);
        if (idx >= full_text.length) {
            clearInterval(type_timer);
        }
    }, 28);
}

type_header();
