const Tablefilter = ({total,type,setEntery,groupby,data,handlecat}) =>{
return(
	<div className="row">
	<div className="col-2">
	<div className="form-group">
	
	<label>Group-By</label>
	<select className="form-select" onChange={handlecat}>
		<option value="all">All</option>
		{type.map(ty=><option>{ty.category}</option>)}
	</select>
	</div>
	</div>
	{total > 5 &&
	<div className="col-2">
	<div className="form-group">
	

	<label>Enrty</label>
	<select className="form-select" onChange={(e)=>setEntery(e.target.value)} disabled={groupby !== "all" ? true : false}>
		{data.map(d=><option value={parseInt(d)}>{d}</option>)}
	</select>
	</div>
	</div>}
	</div>
	)
}
export default Tablefilter;