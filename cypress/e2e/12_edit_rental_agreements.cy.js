it("delete property", () => {  
    cy.visit("http://localhost:8789/login/")
    cy.get("#inp-login-email").type('test@orbitlabs.xyz');
    cy.get("#inp-login-password1").type('test');
    cy.get("#btn-login").click();
    cy.get("#projects-cy").click();
    cy.visit("http://localhost:8789/property/rental-agreements//")
    cy.get("#edit-0-cy").click();
    cy.get("#inp-name").type('Agreement testx');
    cy.get("#inp-amount").type('10000000');
    cy.get("#inp-deposit").type('100000');
    cy.get("#inp-contract").type('Agreement testx');
    cy.get("#inp-startDate").type('test contractx');
    cy.get("#inp-endDate").type('01/01/2024');
    cy.get("#inp-active").select('1');
    //for some reason it is rednering these as text in cypress will have to look into it
    //cy.get("#inp-agentId").select('');
    //cy.get("#inp-tenantId").select('1');
    cy.get("#inp-agentId").type('1');
    cy.get("#inp-tenantId").type('1');
    cy.get("#btn-update").click();
    cy.get("#btn-back-cy").click();
    cy.contains("td", "dcondo1");
});