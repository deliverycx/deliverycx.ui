import { DILIVERY_TIME_STATUS } from 'application/contstans/const.orgstatus';
import { compareAsc, format } from 'date-fns'
import { store } from "servises/redux/createStore";


const trueDate = new Date()
function formatDate(date:any) {

  var dd:any = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm:any = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy:any = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

const ng = [
	{
		id:"8e118b94-5883-489f-b3da-aafd5781fdd4",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"13:00-23:00"
			},
			
		]
	},
	{
		id:"aaa33897-fa94-4e85-a640-cca71d434820",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-15:00"
			},
			{
				d:new Date(2024,1,1),
				time:"13:00-22:00"
			},
			
		]
	},
	{
		id:"aaa33897-fa94-4e85-a640-cca71d434820",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-15:00"
			},
			{
				d:new Date(2024,1,1),
				time:"13:00-22:00"
			},
			
		]
	},
	{
		id:"9cba581a-ca13-4fb9-b474-6ad3d9cc35ac",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-21:00"
			},
			
		]
	},
	{
		id:"98d9a444-b7b9-4e50-8e9d-9924bd875788",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"0.5162239644980637",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},

	{
		id:"0.4282903331477561",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},

	{
		id:"0.07186552761806375",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},

	{
		id:"0.14975080498105187",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},


	{
		id:"c4dc40b9-16ff-4405-be2e-368b9783dc04",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"f1200f5d-2990-4df7-a2ca-0ea7c2f27680",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},


	{
		id:"d7414ac1-82b0-4fb3-898c-f05718497c17",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,2),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,3),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,4),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,5),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,6),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,7),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,8),
				time:"10:00-23:00"
			},
		]
	},

	{
		id:"39c0b2b4-ea7d-4748-93fa-3cce528b026a",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"6fd0903a-dba0-40b5-995f-f919031e23d4",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"15:00-23:00"
			},
			{
				d:new Date(2024,1,2),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,3),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,4),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,5),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,6),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,7),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,8),
				time:"10:00-23:00"
			},
		]
	},


	{
		id:"34555507-b98d-464a-b0f0-774abd17d7ea",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"14:00-22:00"
			},
			
		]
	},



	{
		id:"39c0b2b4-ea7d-4748-93fa-3cce528b026a",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},


	{
		id:"ab4d235c-c6ec-42f8-ac01-e876ad9acb92",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"32a6390a-8fd8-4be7-b504-70007dbe0c8e",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"3d65ec85-2efe-43cd-898d-239e45328244",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"982f1bef-772b-4443-9262-f10c4e4bcf7e",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"d137612c-46e6-4055-b28f-7cf9e846a674",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},


	{
		id:"fc66c24b-1f6f-4495-8563-e70cbd31a1df",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},


	{
		id:"3cce23a5-a726-4e58-8bfc-763309e168b0",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"17:00-22:00"
			},
			
		]
	},

	{
		id:"8e3bf1ff-3ef7-4177-b04b-4ed37f9f3cc9",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"17:00-22:00"
			},
			
		]
	},

	{
		id:"d4299ff5-f273-45b5-99b1-48afde2f2f6a",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-19:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},

	{
		id:"bb7ed831-3b10-415a-bfe1-558f254427a3",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"11663d0f-51a6-419d-8814-d3cb180eeab4",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"17:00-22:00"
			},
			
		]
	},



	{
		id:"012f36ea-4a57-4267-9104-90bd354b7037",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-19:00"
			},
			{
				d:new Date(2024,1,1),
				time:"13:00-22:00"
			},
			
		]
	},


	{
		id:"93448991-df76-4320-a24d-5815d22082bf",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-19:00"
			},
			{
				d:new Date(2024,1,1),
				time:"13:00-22:00"
			},
			
		]
	},


	{
		id:"8fc38e88-d63f-4c10-9ee3-083d43f57e34",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"13:00-22:00"
			},
			
		]
	},


	{
		id:"4616a576-c283-44af-b2a1-1b276875f405",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-22:00"
			},
			{
				d:new Date(2024,1,1),
				time:"15:00-22:00"
			},
			
		]
	},

	{
		id:"b23b885f-4523-4e72-b4fe-137c0c6ac385",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},

	{
		id:"c4f1c400-5282-4986-9bec-6d46973d0a25",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2024,1,1),
				time:"14:00-22:00"
			},
			
		]
	},



	{
		id:"facf0414-166a-42fb-a544-1c0e47d0739a",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"13:00-22:00"
			},
			
		]
	},


	//курск
	{
		id:"0.9920653930865655",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"0.9646014799369265",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"0.6553335452672011",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"0.9772541030617252",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"0.5444956174307996",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"0.7494251533374678",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},




	{
		id:"0.2435483074337348",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},


	{
		id:"4762bf88-85f3-4c82-9a80-319c67cc385f",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"10:00-18:00"
			},
			
		]
	},
	{
		id:"90a272bf-4e8e-46a0-b219-4b131c1825d1",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"10:00-18:00"
			},
			
		]
	},

	{
		id:"1204faab-63f6-4560-aa35-d8b3c6bd2de7",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-19:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},


	{
		id:"1204faab-63f6-4560-aa35-d8b3c6bd2de7",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-23:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"1bb791ff-ce37-4402-8362-c5d0cb0ce57c",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"16:00-23:00"
			},
			
		]
	},
	{
		id:"31d275d4-bc39-4a95-891d-510b4f9a95ce",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"14:00-23:00"
			},
			
		]
	},
	{
		id:"6e7d4406-8567-453e-a677-6e7c240d9083",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"16:00-23:00"
			},
			
		]
	},



	{
		id:"f26eeae6-19f6-4e90-80be-131f43d15f4f",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2024,1,1),
				time:"14:00-22:00"
			},
			
		]
	},

	{
		id:"5ace6991-a8b5-4127-b4d0-b7074cb6ccd8",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},


	{
		id:"26836a54-db7f-4bfb-9687-391ae9d7137f",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},


	{
		id:"efba2381-8ff9-48b4-b9f9-99085d38e829",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"13:00-22:00"
			},
			
		]
	},


	{
		id:"0.23521520195517442",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-23:00"
			},
			
		]
	},
	{
		id:"0.22310731554285135",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-23:00"
			},
			
		]
	},


	{
		id:"64834e6b-37e7-4412-b4bc-82cfd339a233",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"ae85e64c-70a4-4d64-ad1c-a25eadb7ed4e",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-19:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"ae85e64c-70a4-4d64-ad1c-a25eadb7ed4e",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,2),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,3),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,4),
				time:"10:00-23:00"
			},
		]
	},

	{
		id:"c20a1290-8a2c-4851-bafa-b2651c0fa3ad",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"d5940803-dcea-4d68-b00a-9aeb17234e73",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,2),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,3),
				time:"10:00-23:00"
			},
			{
				d:new Date(2024,1,4),
				time:"10:00-23:00"
			},
		]
	},
	
	//питер
	{
		id:"464dd24d-be23-4bb6-802b-5de9bcb442bf",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"14:00-23:00"
			},
		]
	},
	{
		id:"87302d41-6c3a-493c-bb76-0338cec6ddaf",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"14:00-23:00"
			},
		]
	},
	{
		id:"c30259b7-6902-4983-924c-c62d16140c99",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"14:00-23:00"
			},
		]
	},
	{
		id:"c78f813b-1e6c-48af-a9a8-8751e4d00f33",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"14:00-23:00"
			},
		]
	},


	{
		id:"7fd74ec2-3f7e-4107-8efe-6f826cde60c9",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},


	{
		id:"7fd74ec2-3f7e-4107-8efe-6f826cde60c9",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"13:00-21:00"
			},
			
		]
	},
	{
		id:"d1c7a1cc-0f25-4e9e-af8d-6e4880a77768",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2024,1,1),
				time:"14:00-22:00"
			},
			
		]
	},
	{
		id:"d7f131c5-a7a4-4f66-95b4-c24c4c8b8b89",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"eb71f972-40be-4f67-81d3-7cbc4dba3122",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"ffbe6868-b9fe-4206-a9ef-14b1ad1f4d76",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"16:00-22:00"
			},
			
		]
	},


	{
		id:"80684af0-9f1a-487c-87a6-849a48700619",
		data:[
			{
				d:new Date(2023,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"3d8f9512-f600-43bf-807d-3b9ff079a078",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-16:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"7dcec94b-1109-439b-a27a-47ef897289ad",
		data:[
			{
				d:new Date(2023,11,29),
				time:"00:00-00:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"7e84af92-6956-45ca-b343-2e8599fd9492",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-21:00"
			},
			{
				d:new Date(2024,6,1),
				time:"10:00-20:00"
			},
		]
	},
	{
		id:"9f1ffb96-6392-4c00-aecc-f84fd5514ea6",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"14:00-22:00"
			},
			
		]
	},
	{
		id:"d1905b6e-08de-41f1-9a5f-8ed09fadbb28",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2024,1,1),
				time:"14:00-20:00"
			},
			{
				d:new Date(2024,6,1),
				time:"10:00-20:00"
			},
			{
				d:new Date(2024,7,1),
				time:"14:00-20:00"
			},
			
		]
	},


	{
		id:"0.8024782558226105",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-22:00"
			},
			
		]
	},

	{
		id:"de892ee3-19e4-4347-a6f4-af6b938d55d4",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-19:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"bc8f5461-f8aa-432b-9c6c-3b0e9e7ec5f6",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"5920d281-bd90-4073-b73a-15fdc3badc00",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"826933a7-4f8f-4539-abab-305a0776eba0",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-17:00"
			},
			{
				d:new Date(2024,1,1),
				time:"00:00-00:00"
			},
			
		]
	},

	{
		id:"d93eca6d-3aec-4417-b326-250399a586ca",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2024,1,1),
				time:"13:00-23:00"
			},
			
		]
	},
	{
		id:"dbd5ee14-5153-45fe-b7e4-771aee93a502",
		data:[
			{
				d:new Date(2023,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2024,1,1),
				time:"12:00-23:00"
			},
			
		]
	},



	{
		id:"0570ba49-f045-4b6e-aad4-cdd3d4924517",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-20:00"
			},
			{
				d:new Date(2024,1,1),
				time:"15:00-22:00"
			},
			
		]
	},
	{
		id:"90fd8b1c-b367-4a29-a808-3c10c55329b1",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-20:00"
			},
			{
				d:new Date(2024,1,1),
				time:"15:00-22:00"
			},
			
		]
	},
	{
		id:"d7c79a4a-a2ce-4329-8b51-4198227741fa",
		data:[
			{
				d:new Date(2023,11,31),
				time:"11:00-20:00"
			},
			{
				d:new Date(2024,1,1),
				time:"15:00-22:00"
			},
			
		]
	},
	
]
export const ngFN = (org:any) =>{
	let time:any

	
	ng.forEach((val:any) =>{
		
		if(val.id == org){
			//console.log(val.id,org);
			val.data.forEach((value:any) =>{
				//console.log(formatDate(trueDate),formatDate(value.d));
				if(value.time === '00:00-00:00'){
					time = '00:00-00:00'
				}
				if(formatDate(trueDate) === formatDate(value.d)){
					//console.log(value.time);
					time = value.time
				}
			})
		}
	})
	//console.log('time',time );
	return time
}


export const workTimeHelp = (org?:any) =>{
	const storage = store.getState();
	const  {workTime,guid} = storage.location.point

	const NGtime = org ? ngFN(org) : ngFN(guid)


	console.log('NGtime',NGtime);
	if(workTime){
		const mok = "10:00-12:00"
		
		const [min,max] = !ngFN(guid) ? workTimeCheck(workTime).split('-')  :ngFN(guid).split('-') //workTimeCheck(workTime) ? workTimeCheck(workTime).split('-') : mok //NGtime ? NGtime.split('-') : workTimeCheck(workTime).split('-')
		const time = format(new Date(), "HH:mm")

		if(min >= time){
			return true
		}else if(max <= time){
			return true
		}else{
			return false
		}
	}
	return false
}


export const checkEmtpyWork = (work:any,index:number) =>{
	if(!work[index]){
		return checkWorkIsArray(work)
	}else{
		return work[index]
	}
}

export const checkWorkIsArray = (work:any) =>{
	if(typeof work == 'string') return ""
	const result = work.filter((val:string) => val !== "")

	if(result.length === 0){
		return null
	}else if(result.length === 1){
		return result[0]
	}else{
		return result
	}
}


export const workTimeCheck = (work:any,org?:any):any => {
	const date = new Date().getDay()
	const storage = store.getState();

	const NGtime = org && ngFN(storage.location.point.guid)
	console.log('qqq',NGtime);

	if(NGtime){
		return NGtime
	}
	

	if(!work || work.length === 0){
		console.log('время сломано');
		return ""
	}
	if(typeof work !== 'string'){
		
		if(date === 0){
			return checkEmtpyWork(work,6)
		}else{
			return checkEmtpyWork(work,date - 1)
		}
	}else{
		return work
	}
	
}



export const delivertyTime = () =>{
	const storage = store.getState();
	const  {workTime} = storage.location.point

	if(storage.location.pointstatus){
		const  {deliveryTime} = storage.location.pointstatus

		const onliPickUPTime = new Date();
		const noDeliveryTime = new Date();

		if(workTimeCheck(workTime) && deliveryTime){
			const [min,max] = workTimeCheck(workTime).split('-')
			
			const timepickup = format(onliPickUPTime.setMinutes(onliPickUPTime.getMinutes() + deliveryTime), "HH:mm")
			const nodelivery = format(noDeliveryTime.setMinutes(noDeliveryTime.getMinutes() + 30), "HH:mm")

			//console.log(timepickup,nodelivery,max);

			if(nodelivery > max){
				return {
					status:DILIVERY_TIME_STATUS.NODELIVERY
				}
			}

			if(timepickup > max){
				return {
					status:DILIVERY_TIME_STATUS.ONLIPICKUP
				}
			}
		}
		
	}
	return false
}
