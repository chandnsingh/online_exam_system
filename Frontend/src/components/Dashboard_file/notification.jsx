function Notification(props) {
    return <div className="flex gap-5 p-2 bg-white shadow rounded-xl mb-2.5"> 
        <img className="h-15 w-15 m-1" src={props.image} alt="" />
        <div>
            <p className="text-m font-semibold">{props.message}</p>
            <p className="font-light text-sm pt-1">Date: {props.date}</p>
        </div>
        </div>
       
       
}

export default Notification