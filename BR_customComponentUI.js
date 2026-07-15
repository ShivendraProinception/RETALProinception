$(document).ready(function () {

    // Waiting for K2 Dom to render to render
    var waitForK2Radios = setInterval(function () {

        // When it finds 'Individual' and 'Local' then script will move ahead
        if ($('label.radio[title="Individual"]').length > 0 && $('label.radio[title="Local"]').length > 0) {

            clearInterval(waitForK2Radios); // Check karna band karo

            // =========================================================
            // 1. BROKER TYPE RADIO BUTTONS TO CARDS
            // =========================================================

            // Direct target using title attribute
            $('label.radio[title="Individual"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <h3>Individual</h3>
                    <p>A person acting as a broker.</p>
                </div>
            `);

            $('label.radio[title="Company"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="6" y="3" width="12" height="18" rx="2" ry="2"></rect>
                            <path d="M10 8h.01M14 8h.01M10 12h.01M14 12h.01M10 16h.01M14 16h.01"></path>
                        </svg>
                    </div>
                    <h3>Company</h3>
                    <p>A registered brokerage business.</p>
                </div>
            `);

            // =========================================================
            // 2. REGISTRATION SCOPE RADIO BUTTONS TO CARDS
            // =========================================================

            $('label.radio[title="Local"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <!-- Shield Icon -->
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <polyline points="9 12 11 14 15 10"></polyline>
                        </svg>
                    </div>
                    <h3>Local (Saudi)</h3>
                    <p>Registered in Saudi Arabia.</p>
                </div>
            `);

            $('label.radio[title="International"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <!-- Globe Icon -->
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18">
                            </path>
                        </svg>
                    </div>
                    <h3>International</h3>
                    <p>Registered outside Saudi Arabia.</p>
                </div>
            `);
        }
    }, 500);

    // =========================================================
    // DYNAMIC STATUS BADGE LOGIC
    // =========================================================
    setInterval(function() {
        var statusLabel = $('span[name="dlbApplicationStatus"]');
        
        if (statusLabel.length > 0) {
            var rawText = statusLabel.text().trim();
            var currentText = rawText.ToLowerCase();
            var appliedStatus = statusLabel.attr('data-applied-status');
            
            // Check if the text is updated and is not empty
            if (currentText !== appliedStatus && currentText !== "") {
                // Save new status so that status is not repetative
                statusLabel.attr('data-applied-status', currentText);
                
                // remove old any custom class if added
                statusLabel.removeClass('status-ok status-warn status-danger status-suspended');
                
                // Based on current text apply correct class
                if (currentText == 'submitted' || currentText == 'active' || currentText == 'approved & active') {
                    statusLabel.addClass('status-ok');
                } 
                else if (currentText == 'expiring soon' || currentText == 'pending approval' || currentText == 'under review by retal') {
                    statusLabel.addClass('status-warn');
                } 
                else if (currentText == 'rejected') {
                    statusLabel.addClass('status-danger');
                } 
                else if (currentText == 'suspended') {
                    statusLabel.addClass('status-suspended');
                }
            }
        }
    }, 500);
});