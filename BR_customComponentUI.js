$(document).ready(function () {
    
    // Waiting for K2 DOM to render
    var waitForK2Radios = setInterval(function() {
        
        // Finding labels with hidden ID Accessibility with their exact name
        // Note: Make sure name matches exactly in K2 Designer
        var brokerLabel = $("div[id$='_AccessibilityLabel']").filter(function() {
            return $(this).text().trim() === "BrokerType_Radio Button List";
        });
        
        var scopeLabel = $("div[id$='_AccessibilityLabel']").filter(function() {            
            return $(this).text().trim() === "RegistrationScope_Radio Button List"; 
        });

        // Check if controls have loaded in DOM or not
        if (brokerLabel.length > 0 && scopeLabel.length > 0) {
            
            clearInterval(waitForK2Radios); // Stop Checking DOM

            // Using K2 hidden ID for radio groups find each radio button 
            var brokerGroup = $('[aria-labelledby="' + brokerLabel.attr('id') + '"]');
            var scopeGroup = $('[aria-labelledby="' + scopeLabel.attr('id') + '"]');

            // =========================================================
            // 1. BROKER TYPE RADIO BUTTONS TO CARDS
            // =========================================================
            
            // Index 0 -> Individual
            brokerGroup.find('.stack[data-stack="0"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <h3 class="dynamic-title">Individual</h3>
                    <p>A person acting as a broker.</p>
                </div>
            `);

            // Index 1 -> Company
            brokerGroup.find('.stack[data-stack="1"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="6" y="3" width="12" height="18" rx="2" ry="2"></rect>
                            <path d="M10 8h.01M14 8h.01M10 12h.01M14 12h.01M10 16h.01M14 16h.01"></path>
                        </svg>
                    </div>
                    <h3 class="dynamic-title">Company</h3>
                    <p>A registered brokerage business.</p>
                </div>
            `);

            // =========================================================
            // 2. REGISTRATION SCOPE RADIO BUTTONS TO CARDS
            // =========================================================
            
            // Index 0 -> Local
            scopeGroup.find('.stack[data-stack="0"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <polyline points="9 12 11 14 15 10"></polyline>
                        </svg>
                    </div>
                    <h3 class="dynamic-title">Local (Saudi)</h3>
                    <p>Registered in Saudi Arabia.</p>
                </div>
            `);

            // Index 1 -> International
            scopeGroup.find('.stack[data-stack="1"] .input-control-text').html(`
                <div class="radio-card-content">
                    <div class="radio-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="#5c3926" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18">
                        </path>
                        </svg>
                    </div>
                    <h3 class="dynamic-title">International</h3>
                    <p>Registered outside Saudi Arabia.</p>
                </div>
            `);
        }
    }, 500);
});