it("edit property", () => {  
    cy.visit("http://localhost:8789/login/")
    cy.get("#inp-login-email").type('test@orbitlabs.xyz');
    cy.get("#inp-login-password1").type('test');
    cy.get("#btn-login").click();
    cy.get("#projects-cy").click();
    cy.get("#edit-2-cy").click();
    cy.get("#inp-name").type('ace propertyx');
    cy.get("#inp-paymentAddress").type('0x960f470cE20Bfb519facA30b770474BBCdF78ef8x');
    cy.get("#inp-address_1").type('Address 1x');
    cy.get("#inp-address_2").type('Address 2x');
    cy.get("#inp-address_3").type('Address 3x');
    cy.get("#inp-address_4").type('Address 4x');
    cy.get("#inp-address_5").type('Address 5x');
    cy.get("#inp-address_6").type('Address 6x');
    cy.get("#inp-bathrooms").select('1');
    cy.get("#inp-bedrooms").select('2');
    cy.get("#inp-localCurrency").select('฿');
    cy.get("#inp-internationalCurrency").select('$');
    cy.get("#inp-LocalTaxesCost").type('10000');
    cy.get("#inp-internationalTaxesCost").type('100000');
    cy.get("#inp-internationalSuggestedRentalPrice").type('190000');
    cy.get("#inp-localSuggestedRentalPrice").type('90000');
    cy.get("#inp-internationalCost").type('540000');
    cy.get("#inp-localCost").type('18000000');
    cy.get("#inp-currentlyRented").select('1');
    cy.get("#inp-state").select('1');
    cy.get("#inp-tranchePrice").type('10000');
    cy.get("#inp-tranches").type('11');
    cy.get("#btn-update").click();
    cy.get("#btn-back-cy").click();
    cy.contains("td", "ace propertyx");

});