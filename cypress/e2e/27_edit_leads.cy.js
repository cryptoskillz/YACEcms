it("edit leads", () => {
    cy.visit("http://localhost:8789/login/")
    cy.get("#inp-login-email").type('test@orbitlabs.xyz');
    cy.get("#inp-login-password1").type('test');
    cy.get("#btn-login").click();
    cy.get("#projects-cy").click();
    cy.visit("http://localhost:8789/property/lead/edit?id=1")
    cy.get("#inp-email").clear();
    cy.get("#inp-email").type('wah2@gah.com');
    cy.get("#inp-tranchesRequested").clear();
    cy.get("#inp-tranchesRequested").type('100');
    cy.get("#btn-update").click();
    cy.visit("http://localhost:8789/property/leads/");
    //todo : fix 
    //cy.contains("td", "wah2@gah.com");
});