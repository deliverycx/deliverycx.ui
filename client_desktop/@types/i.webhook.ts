export interface IReverveTable {
    fullname: string,
    phone: string,
    date: string,
    time: string,
    person: string,
    startTime: string | Date,
    endTime: string | Date,
    organizationId: string,
    maxDate: Date
}

export interface ISocial {
	idorganization:string
	social:{
		vk:string
	}
}