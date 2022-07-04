export interface IReverveTable {
    fullname: string,
    phone: string,
    date: string,
    time: string,
    person: string,
    organizationId: string,
}
export interface IReverveTableValue {
	fullname: string,
	phone: string,
	date: Date,
	time: Date,
	person: string,
	startTime:Date
	endTime:Date
	maxDate:Date
}

export interface ISocial {
	idorganization:string
	social:{
		vk:string
	}
}