it("create rental agreements", () => {
    cy.visit("http://localhost:8789/login/")
    cy.get("#inp-login-email").type('test@orbitlabs.xyz');
    cy.get("#inp-login-password1").type('test');
    cy.get("#btn-login").click();
    cy.get("#projects-cy").click();
    cy.visit("http://localhost:8789/property/rental-agreement/new")
    cy.get("#inp-name").type('Agreement test');
    cy.get("#inp-amount").type('1000000');
    cy.get("#inp-deposit").type('10000');
    cy.get("#inp-contract").type('Agreement contract url');
    cy.get("#inp-startDate").type('01/01/2023');
    cy.get("#inp-endDate").type('01/01/2024');
    cy.get("#inp-active").select('1');
    //for some reason it is rednering these as text in cypress will have to look into it
    //cy.get("#inp-agentId").select('1');
    //cy.get("#inp-tenantId").select('1');
    cy.get("#inp-agentId").type('1');
    cy.get("#inp-tenantId").type('1');
    cy.get("#btn-create").click();
    cy.visit("http://localhost:8789/property/rental-agreements/")
    //todo : fix 
    //cy.contains("td", "Agreement test");
});