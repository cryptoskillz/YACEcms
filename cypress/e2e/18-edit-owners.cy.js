it("edit owners", () => {
    cy.visit("http://localhost:8789/login/")
    cy.get("#inp-login-email").type('test@orbitlabs.xyz');
    cy.get("#inp-login-password1").type('test');
    cy.get("#btn-login").click();
    cy.get("#projects-cy").click();
    cy.visit("http://localhost:8789/property/owner/edit?id=1")
    cy.get("#inp-tokenAmount").clear();
    cy.get("#inp-tokenAmount").type("10001");
    //cy.get("#inp-propertyTokenId").select("1");
    //cy.get("#inp-userId").select("1");
    //cy.get("#inp-propertyTokenId").clear()
    cy.get("#inp-propertyTokenId").type("1");
    //cy.get("#inp-userId").clear()
    cy.get("#inp-userId").type("1");
    cy.get("#btn-update").click();
    cy.visit("http://localhost:8789/property/owners/")
    //todo : fix 
    //cy.contains("td", "10001");
});