$(document).ready(function () {
//New code added
    function enhanceNativeTabsToSidebar() {
        var $tabList = $('ul.tab-box-tabs:not(.sidebar-processed)');
        
        if ($tabList.length > 0) {
            $tabList.addClass('sidebar-processed'); // Mark as done

            // Helper function to find tab by its actual text
            function getTabLiByText(textToFind) {
                var foundLi = null;
                $tabList.find('li').each(function() {
                    if ($(this).text().trim() === textToFind) {
                        foundLi = $(this);
                        return false; // break loop
                    }
                });
                return foundLi;
            }

            // 1. All Brokers Tab
            var $brokerTab = getTabLiByText("All Brokers");
            if ($brokerTab) {
                $('<li class="sidebar-section-header">BROKERS</li>').insertBefore($brokerTab);
                var icon1 = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon" style="margin-right: 12px;"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`;
                $brokerTab.find('.tab-text').prepend(icon1);
            }

            // 2. Approvals (Worklist) Tab
            var $reviewTab = getTabLiByText("Approvals (Worklist)");
            if ($reviewTab) {
                $('<li class="sidebar-section-header" style="margin-top: 24px;">REVIEW</li>').insertBefore($reviewTab);
                var icon2 = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon" style="margin-right: 12px;"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`;
                $reviewTab.find('.tab-text').prepend(icon2);
            }

            // 3. Admin / Configuration Tab
            var $setupTab = getTabLiByText("Admin / Configuration");
            if ($setupTab) {
                $('<li class="sidebar-section-header" style="margin-top: 24px;">SETUP</li>').insertBefore($setupTab);
                var icon3 = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon" style="margin-right: 12px;"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
                $setupTab.find('.tab-text').prepend(icon3);
            }
        }
    }

    // Try immediately
    enhanceNativeTabsToSidebar();
    
    // K2 observer fallback
    let domTimer;
    let observer = new MutationObserver(function () {
        clearTimeout(domTimer);
        domTimer = setTimeout(function() {
            enhanceNativeTabsToSidebar();
        }, 150);
    });
    observer.observe(document.body, { childList: true, subtree: true });
});