/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
	context('Проверка городов', () => {
		it('количество городов', () => {
	    cy.get('.welcome__city-list .welcome__city').should('have.length', 22)
	  })
		it('Первый город', () => {
			cy.get('.welcome__city-list .welcome__city').first().should('have.text', 'Симферополь')
	  })
		it('Поиск города', () => {
			cy.get('.welcome__search__input').type(`${'Симферополь'}{enter}`)
			cy.get('.welcome__city-list .welcome__city').first().should('have.text', 'Симферополь')
		})
		it('Выбор города', () => {
			cy.get('.welcome__city-list .welcome__city').first().click()
			cy.get('[data-cy="back"]').click()
			cy.get('.welcome__city-list .welcome__city').first().should('have.class', 'selected')
			//cy.window().then(($window) => console.log($window.store.getState()))
	  })
	})
  
})
