it("delete cost", () => {
    cy.visit("http://localhost:8789/login/")
    cy.get("#inp-login-email").type('test@orbitlabs.xyz');
    cy.get("#inp-login-password1").type('test');
    cy.get("#btn-login").click();
    cy.get("#projects-cy").click();
    cy.visit("http://localhost:8789/property/cost/edit?id=1")
    cy.visit("http://localhost:8789/property/costs/")
    cy.get("#delete-0-cy").click();
    cy.get("#confirmation-modal-delete-button").click();   
});