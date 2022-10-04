declare global {
	interface Window{
		Cypress: any
		store: any
		initialState:{
			name:string
			state:any
		}
	}
	//Window & typeof globalThis & { Cypress: any; store: any };
} 

export {}