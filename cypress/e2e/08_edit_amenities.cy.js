it("edit amenities", () => {
    cy.visit("http://localhost:8789/login/")
    cy.get("#inp-login-email").type('test@orbitlabs.xyz');
    cy.get("#inp-login-password1").type('test');
    cy.get("#btn-login").click();
    cy.get("#projects-cy").click();
    cy.visit("http://localhost:8789/property/amenity/edit/?id=2")
    //cy.get("#edit-0-cy").click();
    cy.get("#inp-name").select('24 Hour Security');
    cy.get("#btn-update").click();
    cy.visit("http://localhost:8789/property/amenities/")
    cy.contains("td", "24 Hour Security");
});