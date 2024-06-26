
describe('Side Navigation', () => {
    beforeEach(() => {
        cy.session('signed-in', () => {
            cy.signIn();
        })
        cy.visit('/dashboard/documents', { failOnStatusCode: false});
    })
    
    it('renders the organization switcher', () => {
        cy.get('[aria-label="Open organization switcher"]').should('exist'); 
    });
    
    it('has a working "New Document" link', () => {
        cy.get('a[href="/dashboard/new"]').click();
        cy.url().should('include', '/dashboard/new');
    });
    
    it('has a working "Documents" link', () => {
        cy.get('a[href="/dashboard/documents"]').click({ multiple: true });
        cy.url().should('include', '/dashboard/documents');
    });
    
    it('has a working "Favourites" link', () => {
        cy.get('a[href="/dashboard/favourites"]').click();
        cy.url().should('include', '/dashboard/favourites');
    });
    
    it('changes button styles based on the active route', () => {
        const checkButtonStyle = (buttonText, expectedFontWeight) => {
            cy.contains('button', buttonText)
            .should('have.css', 'font-weight', expectedFontWeight);
        };
    
        cy.visit('/dashboard/new', { failOnStatusCode: false});
        checkButtonStyle('New document', '700');

        cy.visit('/dashboard/documents', { failOnStatusCode: false});
        checkButtonStyle('Documents', '700');
    
        cy.visit('/dashboard/favourites', { failOnStatusCode: false});
        checkButtonStyle('Favourites', '700');
    });
});