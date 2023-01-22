it("forgot password click", () => {
    cy.visit("http://localhost:8789/login/")
    cy.get("#cy_forgotpassword").click();
    cy.get("#inp-forgot-email").type('test@orbitlabs.xyz');
    cy.get("#btn-forgot-password").click();
});