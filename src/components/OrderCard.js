import React, { useEffect, useState } from "react"; 


function OrderCard(props) {

    //render the work order cards here

    //set initial state hooks, workerInfo collects info from a specific id, whereas cardMount is for controlling useEffect
    const [workerInfo, setWorker] = useState("");
    const [cardMount, setMount] = useState(true);

    //run fetch on url using id passed in as props, obtain json response then set state filling the returned worker info
    async function getWorker(){
        const response = await fetch('https://api.hatchways.io/assessment/workers/' + props.workerId);
        const worker = await response.json();
        setWorker(worker.worker);
    }

    //call the fetch on mount, only when I want to
    useEffect(() => {
        getWorker()
        
    }, [cardMount]
    )

    //change time from epoch to normal time, takes in the props deadline and returns it adjusted
    const dateChange = function(date){
        //multiply by 1000 to go from seconds to milliseconds since the expected argument is in milliseconds
        let adjustedDate = new Date(date*1000);
        adjustedDate=adjustedDate.toLocaleString();
        return adjustedDate;
    }

    //render the individual work orders, passing in props to fill in info, in one case calling a function to adjust what to display
    return (
        <div className="card">
            <h2>Work Order {props.id}</h2>
            <div className="worker-data">
                <img src={workerInfo.image}></img>
                <div className="worker-text-data">
                    <p>{workerInfo.name}</p>
                    <p>{workerInfo.companyName}</p>
                    <p>{workerInfo.email}</p>
                </div>
            </div>
            <p>{dateChange(props.deadline)}</p>
        </div>
  )
}

export default OrderCard;
