it("edit payment", () => {
    cy.visit("http://localhost:8789/login/")
    cy.get("#inp-login-email").type('test@orbitlabs.xyz');
    cy.get("#inp-login-password1").type('test');
    cy.get("#btn-login").click();
    cy.get("#projects-cy").click();
    cy.visit("http://localhost:8789/property/payment/edit?id=1");
    cy.get("#inp-name").clear();
    cy.get("#inp-name").type('rent');
    cy.get("#inp-amountInternational").clear();
    cy.get("#inp-amountInternational").type('100');
    cy.get("#inp-paidBy").clear();
    cy.get("#inp-paidBy").type('1');
    cy.get("#inp-BTCExchangeRate").clear();
    cy.get("#inp-BTCExchangeRate").type('10');
    cy.get("#inp-ETHExchangeRate").clear();
    cy.get("#inp-ETHExchangeRate").type('1');
    cy.get("#inp-BNBExchnageRate").clear();
    cy.get("#inp-BNBExchnageRate").type('1');
    cy.get("#inp-rentalId").clear();
    cy.get("#inp-rentalId").type('1');
    cy.get("#btn-update").click();
    cy.visit("http://localhost:8789/property/payments/");
    //todo : fix      
    //cy.contains("td", "rent");
});