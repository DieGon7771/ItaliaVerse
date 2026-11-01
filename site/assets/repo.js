/*
  shortcodes : lista di shortcode CloudStream (può essere vuota)
  url        : link repo.json da aggiungere in CloudStream
  plugins    : link a plugins.json oppure a un repo.json (in quel caso segue i suoi pluginLists)
  g / gl / c / glow : gradiente (scuro / chiaro), colore accento, colore dell'alone
*/
const HOME = {
    name: 'ItaliaVerse',
    subtitle: 'MegaRepo Italiano',
    logo: 'img/italiaverse.png',
    desc: 'Un unico plugin che aggiunge tutti i repository italiani a CloudStream.',
    shortcodes: ['itaverse'],
    url: 'https://raw.githubusercontent.com/DieGon7771/ItaliaVerse/main/repo.json',
    github: 'https://github.com/DieGon7771/ItaliaVerse',
    g: 'linear-gradient(135deg,#38bdf8,#3b6bff,#7c3aed)',
        gl: 'linear-gradient(135deg,#0284c7,#2563eb,#6d28d9)',
    c: '#6d8bff',
    glow: '#3b6bff'
};

const REPOS = [
    {
        id: 'dogiorhadenough',
        name: 'DogiorHadEnough',
        logo: 'img/dogior.png',
        desc: '',
        shortcodes: ['dogior', '1740'],
        url: 'https://raw.githubusercontent.com/doGior/doGiorsHadEnough/builds/repo.json',
        github: 'https://github.com/doGior/doGiorsHadEnough',
        plugins: 'https://raw.githubusercontent.com/doGior/doGiorsHadEnough/builds/plugins.json',
        g: 'linear-gradient(135deg,#fde047,#fb923c,#ef4444)',
        gl: 'linear-gradient(135deg,#d97706,#ea580c,#dc2626)',
        c: '#fb923c',
        glow: '#fb923c'
    },
    {
        id: 'italiainstreaming',
        name: 'ItaliaInStreaming',
        subtitle: 'DieGon Repository',
        logo: 'img/italiainstreaming.png',
        desc: '',
        shortcodes: ['diegon7', '865'],
        url: 'https://raw.githubusercontent.com/DieGon7771/ItaliaInStreaming/builds/repo.json',
        plugins: 'https://raw.githubusercontent.com/DieGon7771/ItaliaInStreaming/builds/plugins.json',
        github: 'https://github.com/DieGon7771/ItaliaInStreaming',
        g: 'linear-gradient(135deg,#22d3ee,#6366f1,#a855f7,#ec4899,#f97316)',
        gl: 'linear-gradient(135deg,#0891b2,#4f46e5,#9333ea,#db2777,#ea580c)',
        c: '#a855f7',
        glow: '#a855f7'
    },
    {
        id: 'prisynx',
        name: 'PriSynx',
        logo: 'img/prisynx.png',
        round: true,
        desc: '',
        shortcodes: ['prisynx'],
        url: 'https://raw.githubusercontent.com/qwertyuiop8899/prisynx_cs3/main/center.json',
        github: 'https://github.com/qwertyuiop8899/PriSynx',
        plugins: 'https://raw.githubusercontent.com/qwertyuiop8899/prisynx_cs3/main/center.json',
        g: 'linear-gradient(135deg,#e879f9,#a855f7,#6d28d9)',
        gl: 'linear-gradient(135deg,#c026d3,#9333ea,#6d28d9)',
        c: '#c084fc',
        glow: '#a855f7'
    },
    {
        id: 'prisynx-singoli',
        name: 'PriSynx',
        subtitle: 'plugin singoli',
        logo: 'img/prisynx.png',
        round: true,
        desc: '',
        shortcodes: [],
        url: 'https://raw.githubusercontent.com/qwertyuiop8899/prisynx_cs3/main/singoli.json',
        github: 'https://github.com/qwertyuiop8899/PriSynx',
        plugins: 'https://raw.githubusercontent.com/qwertyuiop8899/prisynx_cs3/main/singoli.json',
        g: 'linear-gradient(135deg,#f0abfc,#c084fc,#818cf8)',
        gl: 'linear-gradient(135deg,#a21caf,#7c3aed,#4f46e5)',
        c: '#c4b5fd',
        glow: '#818cf8'
    }
];

const AVATAR_IMG_CLASS = { dogiorhadenough: 'pad', italiainstreaming: 'pad', prisynx: 'cover', 'prisynx-singoli': 'cover' };

const STATUS = { 0: 'Disattivato', 1: 'In funzione', 2: 'Lento', 3: 'Beta' };
const INSTALL_HELPER = 'https://diegon7771.github.io/Cs-site/?r=';

function esc(s) {
    const d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
}
function vars(r) { return '--gd:' + r.g + ';--gl:' + (r.gl || r.g) + ';--c:' + r.c + ';--glow:' + r.glow + ';'; }
function installLink(url) { return INSTALL_HELPER + 'cloudstreamrepo://' + url.replace(/^https?:\/\//, ''); }
function copyBtn(text, label) { return '<button class="btn" data-copy="' + esc(text) + '">' + (label || 'Copia') + '</button>'; }
function installBtn(url) { return '<a class="btn primary" href="' + esc(installLink(url)) + '" target="_blank" rel="noopener">Installa</a>'; }
function chips(list) {
    if (!list || !list.length) return '';
    return '<div class="chips"><span class="lbl">Shortcode</span>'
        + list.map(s => '<button class="chip" data-copy="' + esc(s) + '" title="Copia">' + esc(s) + '</button>').join('')
        + '</div>';
}
function urlBox(r) {
    if (!r.url) return '';
    return '<div class="url-box"><div class="field">' + esc(r.url) + '</div>' + copyBtn(r.url) + installBtn(r.url)
        + (r.github ? '<a class="btn" href="' + esc(r.github) + '" target="_blank" rel="noopener">GitHub</a>' : '') + '</div>';
}

function renderHome() {
    return '<header class="hero" style="' + vars(HOME) + '">'
        + '<img class="logo" src="' + HOME.logo + '" alt="ItaliaVerse">'
        + '<h1 class="grad">' + esc(HOME.name) + '</h1>'
        + '<p class="sub">' + esc(HOME.subtitle) + '</p>'
        + '<p class="desc">' + esc(HOME.desc) + '</p>'
        + '<div class="install">' + urlBox(HOME) + chips(HOME.shortcodes).replace('class="chips"', 'class="chips" style="justify-content:center"') + '</div>'
        + '</header>'
        + '<nav class="avatars">' + REPOS.map(r =>
            '<a class="avatar" href="#' + r.id + '" style="' + vars(r) + '">'
            + '<div class="ring"><span><img class="' + (AVATAR_IMG_CLASS[r.id] || '') + '" src="' + r.logo + '" alt=""></span></div>'
            + '<b>' + esc(r.name) + (r.subtitle ? '<small>' + esc(r.subtitle) + '</small>' : '') + '</b></a>'
        ).join('') + '</nav>';
}

function renderRepo(r) {
    return '<section class="repo" id="' + r.id + '" style="' + vars(r) + '">'
        + '<div class="head"><img class="logo' + (r.round ? ' round' : '') + '" src="' + esc(r.logo) + '" alt="">'
        + '<h2><span class="grad">' + esc(r.name) + '</span>' + (r.subtitle ? '<span class="s">' + esc(r.subtitle) + '</span>' : '') + '</h2></div>'
        + (r.desc ? '<p class="desc2">' + esc(r.desc) + '</p>' : '')
        + chips(r.shortcodes) + urlBox(r)
        + '<div class="plugins-title">Plugin <span class="count" id="count-' + r.id + '" hidden></span></div>'
        + '<div id="plugins-' + r.id + '"><p class="note">' + (r.plugins ? 'Caricamento…' : 'Lista plugin in arrivo.') + '</p></div>'
        + '</section>';
}

async function getJson(url) {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
}

async function loadPluginList(url) {
    const data = await getJson(url);
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.pluginLists)) {
        const lists = await Promise.all(data.pluginLists.map(u => getJson(u).catch(() => [])));
        return lists.flat();
    }
    return [];
}

function loadPlugins(r) {
    if (!r.plugins) return;
    const box = document.getElementById('plugins-' + r.id);
    const count = document.getElementById('count-' + r.id);
    loadPluginList(r.plugins).then(list => {
        const seen = new Set();
        list = list.filter(p => p && p.name && !seen.has(p.name) && seen.add(p.name));
        if (!list.length) { box.innerHTML = '<p class="note">Nessun plugin trovato.</p>'; return; }
        list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
        count.textContent = list.length; count.hidden = false;
        box.innerHTML = '<div class="plugins">' + list.map(p => {
            const known = STATUS[p.status] !== undefined;
            return '<div class="plugin"><span class="dot' + (known ? ' s' + p.status : '') + '"></span><span>' + esc(p.name) + '</span>'
                + (known ? '<small>' + STATUS[p.status] + '</small>' : '') + '</div>';
        }).join('') + '</div>';
    }).catch(() => { box.innerHTML = '<p class="note">Lista plugin non disponibile.</p>'; });
}

document.getElementById('app').innerHTML = renderHome() + REPOS.map(renderRepo).join('');
REPOS.forEach(loadPlugins);

document.addEventListener('click', async e => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const text = b.getAttribute('data-copy');
    try { await navigator.clipboard.writeText(text); }
    catch {
        const t = document.createElement('textarea');
        t.value = text; document.body.appendChild(t); t.select();
        document.execCommand('copy'); t.remove();
    }
    const old = b.textContent;
    b.textContent = 'Copiato!'; b.classList.add('done');
    setTimeout(() => { b.textContent = old; b.classList.remove('done'); }, 1800);
});
