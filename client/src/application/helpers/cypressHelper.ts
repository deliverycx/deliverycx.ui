import { thisWindow } from "@types";

export const CypressInitState = (name:string) => (thisWindow.Cypress && thisWindow.initialState.name === 'city' && thisWindow.initialState.state)