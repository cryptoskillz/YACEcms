 it("create owners", () => {
     cy.visit("http://localhost:8789/login/")
     cy.get("#inp-login-email").type('test@orbitlabs.xyz');
     cy.get("#inp-login-password1").type('test');
     cy.get("#btn-login").click();
     cy.get("#projects-cy").click();
     cy.visit("http://localhost:8789/property/owner/new/")
     cy.get("#inp-tokenAmount").type("10000");
     //cy.get("#inp-propertyTokenId").select("1");
     //cy.get("#inp-userId").select("1");
     cy.get("#inp-propertyTokenId").type("1");
     cy.get("#inp-userId").type("1");
     cy.get("#btn-create").click();
     cy.visit("http://localhost:8789/property/owners/")
     //todo : fix 
     //cy.contains("td", "10000");
 });