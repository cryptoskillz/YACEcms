it("acreate amenities", () => {
    cy.visit("http://localhost:8789/login/")
    cy.get("#inp-login-email").type('test@orbitlabs.xyz');
    cy.get("#inp-login-password1").type('test');
    cy.get("#btn-login").click();
    cy.get("#projects-cy").click();
    cy.visit("http://localhost:8789/property/amenities/")
    cy.get("#btn-create-cy").click();
    cy.get("#inp-name").select('Fully Furnished');
    cy.get("#btn-create").click();
    cy.get("#btn-back-cy").click();
    cy.contains("td", "Fully Furnished");
});