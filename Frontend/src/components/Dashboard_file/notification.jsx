function Notification(props) {
    return <div className="pb-3.5 flex gap-5"> 
        <img className="h-10 w-10 p-1 m-1" src={props.news} alt="" />
             <p className="font-mono from-neutral-400 text-sm leading-tight">Date : { props.date} <br /> {props.message}</p>
            
        </div>
       
}

export default Notification