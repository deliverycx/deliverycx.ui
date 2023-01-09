/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareAsc, format } from 'date-fns'
import { store } from "servises/redux/createStore";

/*
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
		id:"fe470000-906b-0025-0e63-08d90c135198",
		data:[
			{
				d:new Date(2022,11,31),
				time:"11:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"13:00-23:00"
			},
			
		]
	},
	{
		id:"5f850000-90a3-0025-5bcc-08d93bd11ce8",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2023,1,1),
				time:"15:00-23:00"
			},
			
		]
	},
	{
		id:"01330000-6bec-ac1f-1379-08d9ba87fe6e",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"13:00-21:00"
			},
			
		]
	},
	{
		id:"fe470000-906b-0025-5e9a-08d8fb59a3c7",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"fe470000-906b-0025-5e9a-08d8fb59a3c7",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"0.7213543018691466",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-19:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"0.2674546713882451",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"0.8259738813957176",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"01330000-6bec-ac1f-5885-08da6574ff79",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"01330000-6bec-ac1f-7958-08dadde671cc",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,2),
				time:"13:00-22:00"
			},
		]
	},
	{
		id:"01330000-6bec-ac1f-07aa-08da294eefa3",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			}
		]
	},
	{
		id:"5f850000-90a3-0025-b4a7-08d926b4affa",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			}
		]
	},
	{
		id:"01330000-6bec-ac1f-376a-08da8041df10",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"14:00-22:00"
			}
		]
	},
	{
		id:"fe470000-906b-0025-c6e7-08d8dfbd1192",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			}
		]
	},
	{
		id:"01330000-6bec-ac1f-211c-08dab34482bd",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"15:00-23:00"
			},
			{
				d:new Date(2023,1,2),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,3),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,4),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,5),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,6),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,7),
				time:"11:00-23:00"
			},
		]
	},
	{
		id:"01330000-6bec-ac1f-58b5-08da79fed99c",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-15:00"
			},
			{
				d:new Date(2023,1,1),
				time:"15:00-22:00"
			}
		]
	},
	{
		id:"03650000-6bec-ac1f-3dba-08dae3f9e1b7",
		data:[
			{
				d:new Date(2023,1,6),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,7),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,8),
				time:"10:00-22:00"
			}
		]
	},
	{
		id:"03650000-6bec-ac1f-feac-08d9cb81a4a1",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,2),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,3),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,4),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,5),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,6),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,7),
				time:"11:00-23:00"
			},
		]
	},
	{
		id:"fe470000-906b-0025-9119-08d8fb61fa95",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"17:00-22:00"
			},
			
		]
	},
	{
		id:"01330000-6bec-ac1f-a2f1-08da196c5d83",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"17:00-22:00"
			},
			
		]
	},
	{
		id:"fe470000-906b-0025-c376-08d8fb5b90d6",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"03650000-6bec-ac1f-240d-08da13555314",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-19:00"
			},
			{
				d:new Date(2023,1,1),
				time:"13:00-23:00"
			},
			{
				d:new Date(2023,1,2),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,3),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,4),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,5),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,6),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,7),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,8),
				time:"10:00-23:00"
			},
			
		]
	},
	{
		id:"03650000-6bec-ac1f-3dfe-08da135d3bb7",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-19:00"
			},
			{
				d:new Date(2023,1,1),
				time:"13:00-23:00"
			},
			{
				d:new Date(2023,1,2),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,3),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,4),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,5),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,6),
				time:"11:00-23:00"
			},
			{
				d:new Date(2023,1,7),
				time:"11:00-23:00"
			},
			
			
		]
	},
	{
		id:"03650000-6bec-ac1f-780f-08dac7d35171",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"01330000-6bec-ac1f-15d7-08dae1c2304b",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-23:00"
			},
			
		]
	},
	{
		id:"0.12043748943842592",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"0.3335562589696732",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-20:00"
			},
			
		]
	},
	{
		id:"0.9620424978765256",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"0.10962832723965232",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-21:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-21:00"
			},
			
		]
	},

	{
		id:"0.12043748943842592",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-21:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-21:00"
			},
			
		]
	},
	{
		id:"0.12043748943842592",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"0.6379409479052207",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"01330000-6bec-ac1f-1a38-08d9ba86f38a",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"17:00-22:00"
			},
			
		]
	},
	{
		id:"01330000-6bec-ac1f-e089-08da89befeb7",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-21:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"01330000-6bec-ac1f-3331-08dadddb8258",
		data:[
			{
				d:new Date(2022,11,31),
				time:"11:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"01330000-6bec-ac1f-9f63-08dae1c537e9",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"03650000-6bec-ac1f-b0e9-08da1d44c109",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			},
			
		]
	},
	{
		id:"03650000-6bec-ac1f-dd27-08da926320f0",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"03650000-6bec-ac1f-91ef-08da3efe474b",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"03650000-6bec-ac1f-6f91-08dad9020783",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			
		]
	},
	{
		id:"03650000-6bec-ac1f-625b-08da22c2cfc5",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,2),
				time:"12:00-23:00"
			}
			
		]
	},
	{
		id:"03650000-6bec-ac1f-7b5d-08dacd36d86d",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,2),
				time:"12:00-23:00"
			}
			
		]
	},
	{
		id:"fe470000-906b-0025-ea42-08d8fb542c36",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,2),
				time:"10:00-22:00"
			}
			
		]
	},
	{
		id:"fe470000-906b-0025-62fc-08d8fb6d0c5a",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			}
			
		]
	},
	{
		id:"5f850000-90a3-0025-64a1-08d910ae0c47",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2023,1,1),
				time:"14:00-22:00"
			}
			
		]
	},
	{
		id:"fe470000-906b-0025-eaf8-08d95f013b57",
		data:[
			{
				d:new Date(2022,11,31),
				time:"09:00-20:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			}
			
		]
	},
	{
		id:"5f850000-90a3-0025-7743-08d93c8467b7",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,2),
				time:"14:00-22:00"
			}
		]
	},
	{
		id:"fe470000-906b-0025-eaf8-08d95f013b57",
		data:[
			{
				d:new Date(2022,11,31),
				time:"09:00-20:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			}
			
		]
	},
	{
		id:"fe470000-906b-0025-b681-08d8dfb9ed2a",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-21:00"
			},
			{
				d:new Date(2023,1,6),
				time:"10:00-18:00"
			}
			
		]
	},
	{
		id:"fe470000-906b-0025-eaf8-08d95f013b57",
		data:[
			{
				d:new Date(2022,11,31),
				time:"09:00-20:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			}
			
		]
	},
	{
		id:"5f850000-90a3-0025-9f57-08d92bf14ed8",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,2),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,3),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,4),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,5),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,6),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,7),
				time:"10:00-22:00"
			},
			
		]
	},
	{
		id:"fe470000-906b-0025-99f7-08d8fb4b37e6",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"14:00-22:00"
			}
			
		]
	},
	{
		id:"fe470000-906b-0025-00f6-08d8de6557e1",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,2),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,3),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,4),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,5),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,6),
				time:"10:00-22:00"
			},
			{
				d:new Date(2023,1,7),
				time:"10:00-22:00"
			},
			
		]
	},
	{
		id:"fe470000-906b-0025-307f-08d8dfb88a89",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"14:00-21:30"
			}
			
		]
	},
	{
		id:"0.8146571777395826",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-20:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			}
			
		]
	},
	{
		id:"0.44771398541701224",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-17:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-22:00"
			}
			
		]
	},
	{
		id:"03650000-6bec-ac1f-c1d4-08d9f0523070",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-19:00"
			},
			{
				d:new Date(2023,1,1),
				time:"14:00-22:00"
			}
			
		]
	},
	{
		id:"01330000-6bec-ac1f-6de2-08dae1c3cf14",
		data:[
			{
				d:new Date(2022,11,31),
				time:"00:00-00:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			}
			
		]
	},
	{
		id:"fe470000-906b-0025-1b02-08d8fb5e7248",
		data:[
			{
				d:new Date(2022,11,31),
				time:"11:00-18:00"
			},
			{
				d:new Date(2023,1,1),
				time:"00:00-00:00"
			}
			
		]
	},
	{
		id:"fe470000-906b-0025-32c7-08d8fb5c8a29",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-16:00"
			},
			{
				d:new Date(2023,1,1),
				time:"13:00-23:00"
			},
			{
				d:new Date(2023,1,2),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,3),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,4),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,5),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,6),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,7),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,8),
				time:"10:00-23:00"
			},
		]
	},
	{
		id:"fe470000-906b-0025-163b-08d8f9d817e3",
		data:[
			{
				d:new Date(2022,11,31),
				time:"10:00-19:00"
			},
			{
				d:new Date(2023,1,1),
				time:"12:00-23:00"
			},
			{
				d:new Date(2023,1,2),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,3),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,4),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,5),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,6),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,7),
				time:"10:00-23:00"
			},
			{
				d:new Date(2023,1,8),
				time:"10:00-23:00"
			},
		]
	},


]
export const ngFN = (org:any) =>{
	let time:any

	
	ng.forEach((val:any) =>{
		//console.log(val.id,org);
		if(val.id == org){
			
			val.data.forEach((value:any) =>{
				//console.log(formatDate(trueDate),formatDate(value.d));
				//console.log(trueDate,value.d);
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
*/


export const workTimeHelp = (work?:any,org?:any) =>{
	const storage = store.getState();
	const  {workTime} = storage.location.point

	//const NGtime = org && ngFN(org)
	
	
	if(workTime || work){
		const mok2 = "10:00-21:00"
		/*
		const mok = workTime || work
		const [min,max] = NGtime ?  mok ? mok2.split('-') : mok2.split('-')
		*/

		const [min,max] = workTimeCheck(work) ? workTimeCheck(work).split('-') : mok2 // NGtime ? NGtime.split('-') : workTimeCheck(work).split('-')   //workTimeCheck(work) ? workTimeCheck(work).split('-') : mok2
		const time = format(new Date(), "HH:mm")

		
		if(min === "00:00" && max === "00:00"){
			return true
		}

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

export const checkEmtpyWork = (work:string[],index:number) =>{
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

	//console.log('wokcheck',work);
	/*
	const NGtime = org && ngFN(org)

	if(NGtime){
		return NGtime
	}
	*/


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
/*
class WorkTimeHelps{
	private readonly workTime:string[] | string = ""
	private readonly mok = "10:00-21:00"

	workTimeCheck(){
		if(!this.workTime || work.length === 0){
			console.log('время сломано');
			return ""
		}
	}

}
*/