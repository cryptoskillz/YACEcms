it("has the correct headline", () => {
    cy.visit("http://localhost:8789/")
    cy.contains("h4", "Welcome");
    cy.get("#ccy_login").click();
});

