export * from './i.route'
export * from './i.location'
export * from './i.shop'
export * from './i.cart'
export * from './i.ymaps'
export * from './i.profile'
export * from './i.bankcard'


type CypressWindow = Window & typeof globalThis & { Cypress: any; store: any , initialState:{
	name:string
	state:any
} };

export const thisWindow = window as CypressWindow;