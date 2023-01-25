 it("create token", () => {
     cy.visit("http://localhost:8789/login/")
     cy.get("#inp-login-email").type('test@orbitlabs.xyz');
     cy.get("#inp-login-password1").type('test');
     cy.get("#btn-login").click();
     cy.get("#projects-cy").click();
     cy.visit("http://localhost:8789/property/token/new/")
     cy.get("#skipDeploy").click();
     cy.get("#inp-blockExplorerUrl").type("https://testnet.bscscan.com/token/0x1E53214DB10ACE7Ce15eAa49D8BAFbEA890c6f5F");
     cy.get("#inp-contractAddress").type("0x1E53214DB10ACE7Ce15eAa49D8BAFbEA890c6f5F");
     cy.get("#inp-mintedAddress").type("0x960f470cE20Bfb519facA30b770474BBCdF78ef8");
     cy.get("#btn-create").click();
     cy.visit("http://localhost:8789/property/tokens/")
     cy.contains("td", "0x1E53214DB10ACE7Ce15eAa49D8BAFbEA890c6f5F");
});