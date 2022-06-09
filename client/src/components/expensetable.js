//Transaction table
import withLoader,{getData,getPData,date_formatter,date_seter,formater} from './context/utill';
import {useEffect} from 'react';
//HOC withData for props
const ExpenseTable = ({setIsloading,data,handledelete,className,handlesort,handleedit}) =>{ 
return(	
  <div className="table-responsive">
  
 <table class="table   mt-2 " id="mytable" className={className}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col">Category</th>
                    <th scope="col">Ammount<a href="#" onClick={(e)=>{e.preventDefault();handlesort("ammount","asc")}}>
                    <i className="bi bi-caret-up-fill" /></a>
                    <a href="#" onClick={(e)=>{e.preventDefault();handlesort("ammount","dsc")}}>
                    <i className="bi bi-caret-down-fill" /></a></th>
                    <th scope="col">Date</th>
                    <th>Type</th>
                    {handledelete  && <th>Action</th>}
                  </tr>
                </thead>
                <tbody >
                {data.length > 0 && data.map((d,v)=><tr >
                <td className="p-3">{v+1}</td><td className="p-3">{d.type}</td><td className="p-3">{formater(Math.abs(d.ammount))}</td><td>{date_formatter(d.date)}</td>
                <td className="p-3">
                    {d.ammount > 0 ? <span className="badge bg-success ">credit</span> : <span className="badge bg-danger">debit</span>}
                </td>
                <td className="p-3" style={{"display":"flex"}}>
                      {handleedit && <>
                      <a href="#" onClick={(e)=>{e.preventDefault();handleedit(d._id)}}>
                          <h5><i class="bi bi-pencil-fill"></i></h5>
                      </a> </>}
                      {handledelete && <>
                        <a href="#" className="text-danger mx-5" onClick={(e)=>{e.preventDefault();handledelete(d._id)}}>
                            <i class="bi bi-trash-fill"></i>
                        </a></>}
                </td>
                </tr>)}
                 </tbody>
                </table>
                
                {data.length === 0 && <p className="text-muted text-center">No record to display</p>}
                
                </div>
                )
}
export default ExpenseTable;