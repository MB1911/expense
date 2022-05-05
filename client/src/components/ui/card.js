const Card = (props) =>{
return(
	<div className="card">
		<div className="card-body">
		<h5 className="card-title">
			{props.title && props.title}
			<span>| {props.subtitle && props.subtitle}</span>
		</h5>
			{props.children}
		</div>
	</div>
	)
}
export default Card;