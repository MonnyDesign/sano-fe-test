describe("If button is clicked", () => {
  it("button click", () => {
    cy.visit("/studies");
    cy.get('button').eq(6).click() // Click on button
    cy.focused().click() // Click on el with focus
    cy.contains('Join Study').click() // Click on Join Study button
    cy.contains('Leave Study')
  });
});