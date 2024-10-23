export class OrderEntity {
	checkOrderTable(data: any, QRSecton: any) {

		if (data.length !== 0) {
			const table = data.find((section: any) => {
				if (QRSecton && QRSecton.section == section.idsection) {
					return section;
				}
			});

			if (!table) {
				return {
					section: data[0].idsection,
					id: data[0].tables[0].id,
					numb: data[0].tables[0].number,
					tables: data[0].tables,
				};
			}

			if (table && table.name === 'С собой') { //'С собой (СС)
				return {
					section: 'queue',
					id: table.tables[0].id,
					numb: table.tables[0].number,
					tables: table.tables,
				};
			}
			return {
				section: 'qr',
				id: QRSecton.id,
				numb: QRSecton.numb,
				tables: table.tables,
			};
		}
	}
}

/*
if(QRSecton && QRSecton.section == section.idsection){
					
					if(section.name === "С Собой"){
						return acc = {
							section: 'queue',
							id: section.tables[0].id,
							numb: section.tables[0].number,
							tables:section.tables
						}
					}else{
						return acc = {
							section: 'qr',
							id: QRSecton.id,
							numb: QRSecton.numb,
							tables:section.tables
						}
					}
					
				}
				else{
					
					return acc = {
						section: section.idsection,
						id: section.tables[0].id,
						numb: section.tables[0].number,
						tables:section.tables
					}
				}*/


export function validatePhoneNumber(phone: string): string {
	// Удаляем все символы кроме цифр и '+'
	const cleanedPhone = phone.replace(/[^\d+]/g, '');

	// Проверяем, что номер начинается с '+' и содержит только цифры после '+'
	const isValid = /^\+\d+$/.test(cleanedPhone);

	if (isValid) {
		return cleanedPhone;
	} else {
		throw new Error("Phone number is not valid.");
	}
}				