let gtInitialized = false;

// 1. Load Google Translate ONLY when needed
function initGlobalGoogleTranslate() {
    if (!gtInitialized && !document.getElementById('google_translate_element')) {
        let gtDiv = document.createElement('div');
        gtDiv.id = 'google_translate_element';
        gtDiv.style.display = 'none';
        document.body.appendChild(gtDiv);

        window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'ar', autoDisplay: false }, 'google_translate_element');
        };

        let gtScript = document.createElement('script');
        gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(gtScript);
        gtInitialized = true;
    }
}

// 2. Language Layout (Runs only when value is actually different)
function applyCurrentLanguageLayout() {
    let cookieStr = decodeURIComponent(document.cookie);
    let isArabic = cookieStr.includes('googtrans=/en/ar') || cookieStr.includes('googtrans=/auto/ar');
    let currentDir = document.body.style.getPropertyValue('direction');
    
    let btnEnglish = document.querySelector('a[name="btnEnglish"]');
    let btnArabic = document.querySelector('a[name="btnArabic"]');

    if (isArabic && currentDir !== 'rtl') {
        document.body.style.setProperty('direction', 'rtl', 'important');
        document.body.style.setProperty('text-align', 'right', 'important');
        if (btnEnglish) btnEnglish.classList.remove('hidden');
        if (btnArabic) btnArabic.classList.add('hidden');
    } else if (!isArabic && currentDir !== 'ltr') {
        document.body.style.setProperty('direction', 'ltr', 'important');
        document.body.style.setProperty('text-align', 'left', 'important');
        if (btnArabic) btnArabic.classList.remove('hidden');
        if (btnEnglish) btnEnglish.classList.add('hidden');
    }
}

window.translateToArabic = function () {
    initGlobalGoogleTranslate(); // Load script manually on click
    let attempts = 0;
    let tryTranslate = setInterval(function() {
        let combo = document.querySelector('.goog-te-combo');
        if (combo) {
            clearInterval(tryTranslate);
            combo.value = 'ar';
            combo.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
            setTimeout(applyCurrentLanguageLayout, 50);
        }
        if (++attempts >= 20) clearInterval(tryTranslate); // Timeout after 10s if widget fails
    }, 500);
};

window.translateToEnglish = function () {
    var host = location.hostname;
    var baseDomain = host.includes('.') ? "." + host.split('.').slice(-2).join('.') : host;
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + baseDomain;
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + host;
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.documentElement.classList.remove('translated-rtl', 'translated-ltr');
    setTimeout(function () { window.location.reload(); }, 100);
};

// DRY Concept: One card template for all 4 cards
function getRadioCardHTML(title, desc, svgContent) {
    return `<div class="radio-card-content">
                <div class="radio-icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">${svgContent}</svg>
                </div>
                <h3>${title}</h3><p>${desc}</p>
            </div>`;
}

// Main UI logic replacing all setIntervals
function runUIUpdates() {
    // A. Radio Cards Logic (Translation-Proof)
    $('label.radio:not(.card-applied)').each(function() {
        let titleAttr = ($(this).attr('title') || "").toLowerCase();
        let textContent = ($(this).text() || "").toLowerCase();
        let combinedCheck = titleAttr + " " + textContent;
        
        let svg = '', desc = '', cardTitle = '';

        if (combinedCheck.includes("individual") || combinedCheck.includes("فرد")) {
            cardTitle = 'Individual';
            desc = 'A person acting as a broker.';
            svg = '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>';
        } else if (combinedCheck.includes("company") || combinedCheck.includes("شركة")) {
            cardTitle = 'Company';
            desc = 'A registered brokerage business.';
            svg = '<rect x="6" y="3" width="12" height="18" rx="2" ry="2"></rect><path d="M10 8h.01M14 8h.01M10 12h.01M14 12h.01M10 16h.01M14 16h.01"></path>';
        } else if (combinedCheck.includes("local") || combinedCheck.includes("محلي")) {
            cardTitle = 'Local (Saudi)';
            desc = 'Registered in Saudi Arabia.';
            svg = '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline>';
        } else if (combinedCheck.includes("international") || combinedCheck.includes("دولي")) {
            cardTitle = 'International';
            desc = 'Registered outside Saudi Arabia.';
            svg = '<circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"></path>';
        }

        if (svg !== '') {
            $(this).addClass('card-applied').closest('.stack-container').addClass('br-card-group');$(this).find('.input-control-text').html(getRadioCardHTML(cardTitle, desc, svg));
        }
    });

    // B. Status Badges Logic
    $('span[name="dlbApplicationStatus"]:not(.status-processed)').each(function () {
        var $thisLabel =$(this);
        var currentText = $thisLabel.text().trim().toLowerCase();
        var appliedStatus = $thisLabel.attr('data-applied-status');

        if (currentText !== appliedStatus && currentText !== "") {
            $thisLabel.attr('data-applied-status', currentText);$thisLabel.removeClass('status-ok status-warn status-danger status-suspended');

            if (['submitted', 'active', 'approved & active', 'approved by retal', 'extended by retal'].includes(currentText)) {
                $thisLabel.addClass('status-ok');
            } else if (['expiring soon', 'pending approval', 'under review by retal'].includes(currentText)) {
                $thisLabel.addClass('status-warn');
            } else if (['rejected', 'rejected by retal', 'expired', 'expired by retal'].includes(currentText)) {
                $thisLabel.addClass('status-danger');
            } else if (['suspended', 'e-sign pending', 'suspended by retal'].includes(currentText)) {
                $thisLabel.addClass('status-suspended');
            }
            $thisLabel.addClass('status-processed');
        }
    });
}

$(document).ready(function () {
    // Load translation script ONLY if page is already in Arabic
    let cookieStr = decodeURIComponent(document.cookie);
    if (cookieStr.includes('googtrans=/en/ar') || cookieStr.includes('googtrans=/auto/ar')) {
        initGlobalGoogleTranslate(); 
    }
    
    // Run immediately on document ready (Fixes the 500ms lag)
    applyCurrentLanguageLayout(); 
    runUIUpdates(); 

    // Debounced Observer replaces ALL setIntervals
    let domTimer;
    let observer = new MutationObserver(function () {
        clearTimeout(domTimer);
        domTimer = setTimeout(function() {
            $('span[name="dlbApplicationStatus"]').removeClass('status-processed'); 
            runUIUpdates();
            applyCurrentLanguageLayout(); 
        }, 150);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    // Event Listeners for Arabic / English Buttons
    document.addEventListener('click', function (e) {
        if (e.target.closest('[name="btnArabic"]')) window.translateToArabic();
        else if (e.target.closest('[name="btnEnglish"]')) window.translateToEnglish();
    });
});