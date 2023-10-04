

export class OrderEntity{
	checkOrderTable(data:[]){
		if (data.length > 1) {
			return data.reduce((acc:any,section: any) => {
				if (section.name === "С Собой") {
					
					return acc = {
						section: 'queue',
						id: section.tables[0].id,
						numb: section.tables[0].number,
						tables:section.tables
					}
				}else{
					return acc = {
						section: section.idsection,
						id: section.tables[0].id,
						numb: section.tables[0].number,
						tables:section.tables
					}
				}
			},null);
		
		}
	}
}