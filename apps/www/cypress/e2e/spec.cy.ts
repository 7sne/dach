import 'cypress-real-events/support'
import '../support/e2e'

describe('Generate banner.', () => {
    it('Generates banner.', { scrollBehavior: false }, () => {
        cy.visit('http://localhost:3000/toolkit')

        cy.viewport(1280, 720)

        cy.get('[data-cy="banner-pick-color-0"] > [data-cy="tile"]').click()
        cy.get('.rcp-hue').click(240, 0)
        cy.get('.rcp-saturation').click('topRight')

        // @todo - results differ between local and ci.
        cy.get('#hex').should('include.value', '#ff019')
        // @todo - results differ between local and ci.
        cy.get('#rgb').should('include.value', '255, 1, 1')
        cy.get('#hsv').should('have.value', '325°, 100%, 100%')

        cy.get('[data-cy="banner-pick-color-empty-slot"]').click()
        cy.get('[data-cy="banner-pick-color-1"] > [data-cy="tile"]').click()
        cy.get('#rgb').clear()
        cy.get('#rgb').type('247, 234, 239')
        cy.get('[data-cy="banner-pick-color-empty-slot"]').click()
        cy.get('[data-cy="banner-pick-color-empty-slot"]').click()

        cy.get('[data-cy="banner-pick-color-3"] > [data-cy="tile"]').click()
        cy.get('.rcp-saturation').click('bottomLeft')
        cy.get('#hex').clear()
        cy.get('#hex').type('000000')
        cy.get('body').click(0, 0)

        cy.get('[data-cy="banner-pick-color-empty-slot"]').should('not.exist')
        cy.get('[data-cy^="banner-pick-color"]').should('have.length', 4)

        cy.get('[data-cy="title-pick-color"] > [data-cy="tile"]').click()
        cy.get('#hsv').clear()
        cy.get('#hsv').type('0, 0, 100%')
        cy.get('[data-cy="description-pick-color"] > [data-cy="tile"]').click()
        cy.get('.rcp-saturation').click(0, 10)
        cy.get('body').click(0, 0)

        cy.get('[data-cy="banner-title-text"]').clear()
        cy.get('[data-cy="banner-title-text"]').type(
            'Hello everyone, this title is way to long to fit in.',
        )

        // Editable Text relies on the contenteditable attribute, which makes cypress
        // not able to invoke clear like it does with native input elements.
        cy.get('[data-cy="banner-title-text"]').type('{selectall}{backspace}')
        cy.get('[data-cy="banner-title-text"]').type('Better Title.')
        cy.get('[data-cy="banner-description-text"]').clear()

        cy.get('[data-cy="banner-description-text"]').type(
            '{selectall}{backspace}',
        )
        cy.get('[data-cy="banner-description-text"]').type(
            'Much more pleasant description.',
        )

        cy.get('[data-cy="tab-controls"]').click()

        cy.get('[data-cy="banner-title-text"]').should('not.exist')
        cy.get('[data-cy="banner-description-text"]').should('not.exist')

        cy.get('[data-cy="banner-canvas"]')
            .realHover()
            .realMouseDown({ x: 10, y: 10 })
            .realMouseMove(300, 150)
            .realMouseUp()

        cy.get('[data-cy="tab-text"]').click()
        cy.get('[data-cy="banner-ratio-tab-2:1"]').click()

        cy.get('[data-cy="banner-canvas"]').should(
            'have.css',
            'height',
            '287px',
        )

        cy.get('[data-cy="banner-canvas-resize-handle-horizontal"]')
            .realMouseDown()
            .realMouseMove(50, 0, { position: 'center' })
            .realMouseUp()

        cy.get('[data-cy="banner-canvas"]')
            .then(el => {
                const [width] = el.css('width').split('px')
                return Number.parseInt(width)
            })
            // @todo - results differ between local and ci.
            .should('be.greaterThan', 620)
            .should('be.lessThan', 630)

        // Perform visual regression test on the generated banner.
        cy.get('[data-cy="banner-canvas"]').screenshot()
        cy.get('[data-cy="banner-canvas"]').compareSnapshot('e2e', 0.2)
    })
})
