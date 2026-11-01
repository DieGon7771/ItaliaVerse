(function () {
    var ICONS = {
        cloud: '<path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78A6 6 0 1 0 6 12.5 3.5 3.5 0 0 0 6.5 19z"/>',
        repo: '<path d="M4 19.5V5a2 2 0 0 1 2-2h13v15H6.5A2.5 2.5 0 0 0 4 20.5"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H19v-4"/>',
        install: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
        help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7"/><path d="M12 17h.01"/>',
        telegram: '<path d="m21 4-3 16-6-5-3 3v-5l11-9z"/><path d="m9 13 12-9"/>',
        github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
        ext: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>'
    };
    function icon(n, cls) { return '<svg' + (cls ? ' class="' + cls + '"' : '') + ' viewBox="0 0 24 24">' + ICONS[n] + '</svg>'; }

    var NAV = [
        { group: 'Guida', items: [
            { t: 'CloudStream', href: 'index.html', icon: 'cloud' },
            { t: 'Repository', href: 'repository.html', icon: 'repo' },
            { t: 'Come si installano', href: 'installazione.html', icon: 'install' }
        ]},
        { group: 'Supporto', items: [
            { t: 'Problemi comuni', href: 'problemi.html', icon: 'help' }
        ]},
        { group: 'Community', items: [
            { t: 'Telegram', href: 'https://t.me/cloudstream_italia', icon: 'telegram', ext: true },
            { t: 'GitHub', href: 'https://github.com/DieGon7771/ItaliaVerse', icon: 'github', ext: true }
        ]}
    ];

    function slug(p) { return p.split('/').pop().replace(/\.html$/, '') || 'index'; }
    var cur = slug(location.pathname);

    var flat = [];
    NAV.forEach(function (g) { g.items.forEach(function (i) { if (!i.ext) flat.push(i); }); });
    var idx = -1;
    flat.forEach(function (i, n) { if (slug(i.href) === cur) idx = n; });

    var sb = '<a class="brand" href="index.html"><img src="img/italiaverse.png" alt=""><span><b>ItaliaVerse</b><small>MegaRepo Italiano</small></span></a><nav class="nav">';
    NAV.forEach(function (g) {
        sb += '<div class="group">' + g.group + '</div>';
        g.items.forEach(function (i) {
            var on = !i.ext && slug(i.href) === cur;
            sb += '<a href="' + i.href + '"' + (i.ext ? ' target="_blank" rel="noopener"' : '') + (on ? ' class="active"' : '') + '>'
                + icon(i.icon) + '<span>' + i.t + '</span>' + (i.ext ? icon('ext', 'ext') : '') + '</a>';
        });
    });
    sb += '</nav><div class="sidebar-foot">&copy; ' + new Date().getFullYear() + ' DieGon<br>Non affiliato a CloudStream.</div>';

    var layout = document.querySelector('.layout');
    var side = document.createElement('aside');
    side.className = 'sidebar'; side.id = 'sidebar'; side.innerHTML = sb;
    var scrim = document.createElement('div');
    scrim.className = 'scrim';
    layout.insertBefore(scrim, layout.firstChild);
    layout.insertBefore(side, layout.firstChild);

    var title = (document.querySelector('.doc h1') || {}).textContent || document.title;
    var top = document.getElementById('topbar');
    top.innerHTML = '<button class="menu" aria-label="Menu"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>'
        + '<div class="crumb">ItaliaVerse <span>/</span> <b>' + title.replace(/</g, '&lt;') + '</b></div><div class="spacer"></div>'
        + '<button class="icon-link theme" id="themeBtn" aria-label="Cambia tema" title="Tema chiaro/scuro"><svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>'
        + '<a class="icon-link" href="https://t.me/cloudstream_italia" target="_blank" rel="noopener" title="Telegram"><img src="img/telegram.png" alt="Telegram"></a>'
        + '<a class="icon-link" href="https://github.com/DieGon7771/ItaliaVerse" target="_blank" rel="noopener" title="GitHub"><svg viewBox="0 0 24 24"><path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg></a>';

    document.getElementById('themeBtn').addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
    });

    function toggle(open) { document.body.classList.toggle('menu-open', open); }
    top.querySelector('.menu').addEventListener('click', function () { toggle(!document.body.classList.contains('menu-open')); });
    scrim.addEventListener('click', function () { toggle(false); });
    side.addEventListener('click', function (e) { if (e.target.closest('a')) toggle(false); });

    var doc = document.querySelector('.doc');
    var tocBox = document.getElementById('toc');
    if (doc && tocBox && !document.body.hasAttribute('data-no-toc')) {
        var hs = doc.querySelectorAll('h2');
        if (hs.length > 1) {
            var html = '<p>In questa pagina</p>';
            hs.forEach(function (h, n) {
                if (!h.id) h.id = 'sez-' + (n + 1);
                html += '<a href="#' + h.id + '">' + h.textContent + '</a>';
            });
            tocBox.innerHTML = html;
            var links = tocBox.querySelectorAll('a');
            if ('IntersectionObserver' in window) {
                var io = new IntersectionObserver(function (entries) {
                    entries.forEach(function (en) {
                        if (en.isIntersecting) {
                            links.forEach(function (l) { l.classList.toggle('on', l.getAttribute('href') === '#' + en.target.id); });
                        }
                    });
                }, { rootMargin: '-80px 0px -65% 0px' });
                hs.forEach(function (h) { io.observe(h); });
            }
        }
    }

    var pager = document.getElementById('pager');
    if (pager && document.body.hasAttribute('data-no-pager')) pager.remove();
    else if (pager && idx >= 0) {
        var p = idx > 0 ? flat[idx - 1] : null, n = idx < flat.length - 1 ? flat[idx + 1] : null;
        pager.innerHTML = (p ? '<a class="prev" href="' + p.href + '"><small>Precedente</small><b>' + p.t + '</b></a>' : '<span></span>')
            + (n ? '<a class="next" href="' + n.href + '"><small>Successiva</small><b>' + n.t + '</b></a>' : '');
    }

    var f = document.getElementById('footer');
    if (f) f.innerHTML = '&copy; ' + new Date().getFullYear() + ' DieGon &mdash; Non affiliato a CloudStream.';
})();
