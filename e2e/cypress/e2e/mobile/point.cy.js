describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/point',{
			onBeforeLoad: win => {
				win.initialState = {
					name:'city',
					state:{
						id: '6259402e02dae23bd9a4cbe9',
						name: 'Симферополь'
					}
				}
			}

		})
		
  })
	it('Проверка точек', async () => {
		//cy.window().then(($window) => console.log($window.store.getState()))
		//cy.get('.welcome__select-adress').click()
		cy.request('http://localhost:5000/organization/all?cityId=6259402e02dae23bd9a4cbe9').as('points')
		cy.get('.welcome__select-adress').click()

		cy.get('.street').then(($el) => {
			cy.get('@points').then(({body}) => body).each(($els, index, $list) => {
				if($el.text() === $els.address){
					expect($el.text()).equal($els.address)	
				}else{
					 cy.get('.next').click()
				}
			})
		})
		
	})
  
})