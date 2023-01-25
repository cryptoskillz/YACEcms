it("create leads", () => {
    cy.visit("http://localhost:8789/login/")
    cy.get("#inp-login-email").type('test@orbitlabs.xyz');
    cy.get("#inp-login-password1").type('test');
    cy.get("#btn-login").click();
    cy.get("#projects-cy").click();
    cy.visit("http://localhost:8789/property/lead/new/")
    cy.get("#inp-email").type('wah@gah.com');
    cy.get("#inp-tranchesRequested").type('10');
    cy.get("#btn-create").click();
    cy.visit("http://localhost:8789/property/leads/")
    cy.contains("td", "wah@gah.com");
});
