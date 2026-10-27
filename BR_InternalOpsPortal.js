$(document).ready(function () {

    (function () {
        var MARKERS = [
            ['span[name="Ops_cards_style_dlb"]', "pi-has-ops-cards"],
            ['span[name="MyCustomer_List_Style_dlb"]', "pi-has-mycust-list"]
        ];

        function sync() {
            for (var m = 0; m < MARKERS.length; m++) {
                var sel = MARKERS[m][0];
                var cls = MARKERS[m][1];
                var want = [];
                var nodes = document.querySelectorAll(sel);

                for (var i = 0; i < nodes.length; i++) {
                    var el = nodes[i].parentElement;

                    while (el && want.indexOf(el) === -1) {
                        want.push(el);
                        el = el.parentElement;
                    }
                }

                for (var a = 0; a < want.length; a++) {
                    if (!want[a].classList.contains(cls)) {
                        want[a].classList.add(cls);
                    }
                }

                var stale = document.getElementsByClassName(cls);

                for (var s = stale.length - 1; s >= 0; s--) {
                    if (want.indexOf(stale[s]) === -1) {
                        stale[s].classList.remove(cls);
                    }
                }
            }
        }

        window.piSyncOpsAndMyCustomerMarkers = sync;
        sync();

        if (window.MutationObserver) {
            new MutationObserver(sync).observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        }
    })();
    //New code added
    function enhanceNativeTabsToSidebar() {

        $('.tab-box-body .form').each(function () {
            var $headerView = $(this).find('.view').first();
            if ($headerView.length > 0 && !$headerView.hasClass('global-top-navbar')) {
                $headerView.addClass('global-top-navbar');
            }
        });

        var $tabList = $('ul.tab-box-tabs:not(.sidebar-processed)');

        if ($tabList.length > 0) {
            $tabList.addClass('sidebar-processed'); // Mark as done

            // Helper function to find tab by its actual text
            function getTabLiByText(textToFind) {
                var foundLi = null;
                $tabList.find('li').each(function () {
                    if ($(this).text().trim() === textToFind) {
                        foundLi = $(this);
                        return false; // break loop
                    }
                });
                return foundLi;
            }

            var $brokerTab = getTabLiByText("All Brokers");
            if ($brokerTab) {
                // $('<li class="sidebar-section-header">BROKERS</li>').insertBefore($brokerTab);
                var icon1 = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon" style="margin-right: 12px;"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`;
                $brokerTab.find('.tab-text').prepend(icon1);
            }

            // 2. Approvals (Worklist) Tab
            var $reviewTab = getTabLiByText("Approvals");
            if ($reviewTab) {
                // $('<li class="sidebar-section-header" style="margin-top: 24px;">REVIEW</li>').insertBefore($reviewTab);
                var icon2 = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon" style="margin-right: 12px;"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`;
                $reviewTab.find('.tab-text').prepend(icon2);
            }

            // 3. Admin / Configuration Tab
            var $setupTab = getTabLiByText("Broker Activity");
            if ($setupTab) {
                // $('<li class="sidebar-section-header" style="margin-top: 24px;">SETUP</li>').insertBefore($setupTab);
                var icon3 = `<svg viewBox="4 4 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon" style="width: 26px; height: 26px; margin-right: 12px;"><circle cx="12" cy="10" r="2.5"></circle><path d="M7 17c0-2 2-3 5-3s5 1 5 3"></path><path d="M5 9a8 8 0 0 1 14 0"></path><path d="M15 9h4V5"></path><path d="M19 15a8 8 0 0 1-14 0"></path><path d="M9 15H5v4"></path></svg>`;
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
        domTimer = setTimeout(function () {
            enhanceNativeTabsToSidebar();
        }, 150);
    });
    observer.observe(document.body, { childList: true, subtree: true });
});