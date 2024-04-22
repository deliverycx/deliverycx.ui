export const mappersDTO = <T,R>(p:T[] | T,fn:(val:T) => R ) =>{
	
	if(Array.isArray(p)){
		return p.map((val:T)=>{
			return fn(val)
		})
	}else{
		return fn(p)
	}
}