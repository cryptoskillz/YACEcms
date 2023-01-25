 it("create payment", () => {
    cy.visit("http://localhost:8789/login/")
    cy.get("#inp-login-email").type('test@orbitlabs.xyz');
    cy.get("#inp-login-password1").type('test');
    cy.get("#btn-login").click();
    cy.get("#projects-cy").click();
    cy.visit("http://localhost:8789/property/payment/new")
    cy.get("#inp-name").type('rent');
    cy.get("#inp-amountInternational").type('100');
    cy.get("#inp-paidBy").type('1');
    cy.get("#inp-BTCExchangeRate").type('10');
    cy.get("#inp-ETHExchangeRate").type('1');
    cy.get("#inp-BNBExchnageRate").type('1');
    cy.get("#inp-rentalId").type('1');
    cy.get("#btn-create").click();
    cy.visit("http://localhost:8789/property/payments/")
    cy.contains("td", "rent");
});