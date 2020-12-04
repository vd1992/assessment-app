import { useEffect } from 'react';
import React, { useState } from "react"; 
import './App.css';

//import components
import OrderCard from './components/OrderCard'; 
import Search from './components/Search';
import Toggle from './components/Toggle';

//nanoid for generating unique keys
import { nanoid } from "nanoid";


function App() {

  //set hooks for various purposes
  //ordersArray is what rendering is based off of, it changes
  //didMount is to ensure useeffect only goes off when I want it to, preventing infinite loops
  //listDirection controls ascending/early first or descending/later first deadlines
  //ordersBackup is to have a copy of the json array that is to not change at all, storing the original data
  const [ordersArray, setOrdersArray] = useState([]);
  const [didMount, setMount] = useState(true);
  const [listDirection, setDirection] = useState("Now Ascending"); 
  const [ordersBackup, setBackup] = useState([]); 
  
  //cloned backup to doubly ensure backup does not change
  const backup= ordersBackup.slice();

  //run fetch, yield some promise of results to call
  async function fetchWorkOrdersJSON() {
    const response = await fetch('https://api.hatchways.io/assessment/work_orders');
    const workOrdersPromise = await response.json();  
    return workOrdersPromise;
  }

  //run on load once, calls the function then does stuff with the returned promise
  useEffect(() => {
    fetchWorkOrdersJSON().then(data => {
                              //grabs the order part of the JSON response, then sort in ascending order for default, then store it in the hooks
                              let holder = data.orders;
                              holder = holder.sort(function(a,b) {return a.deadline - b.deadline});
                              setOrdersArray(holder);
                              setBackup(holder);
                            }
                            ) 
 
  }, [didMount])

  //function to toggle the direction of the cards loaded
  const changeDirection = function(){

    //cloning to new array then reversing to assign, needed as it won't recognize a change and re-render by simply reversing the old state
    //reverses the direction of the ordersArray
    let holder = ordersArray.slice();
    holder = holder.reverse();
    setOrdersArray(holder);

    //swap text for direction state
    if(listDirection === "Now Ascending"){
      setDirection("Now Descending");
    }
    else{
      setDirection("Now Ascending");
    }
  
  }

  //filter based off a worker id passed in
  //non-strict comparisons intentional, as a number in string or number form is identical for this case
  //!
  //doing the right way to filter may require substantial reworking of code and my assignment, would take too long, so I implemented a different filter just to have one
  //!
  const nameFilter = function(num){
    //if the selected id is 0, no filtering is done, reset ordersArray to default using the backup
    if(num==0){
      setOrdersArray(backup);
    }

    //running through backup as objectsArray will be changing
    //compare num passed in to object's number, adding to array if match
    else{
      let resultsArray=[];
      for(let objects of backup){
       
        if(num==objects.workerId){
          resultsArray.push(objects);
        }
        
      }
      //set ordersArray to the result post filtering, trigger re-render
      setOrdersArray(resultsArray);
    }
  }

  //generate the props of cards to display
  //use mapping method to run through each array element then pass info from it in as props
  const listOrders = ordersArray.map(order => (

      <OrderCard
        id={order.id}
        name={order.name}
        description={order.description}
        deadline={order.deadline}
        workerId={order.workerId}
        key={"unique-" + nanoid()}
      />
    )
  )

  //render the components, and the array of components 
  return (
    <div className="app-whole">
      <Search
        nameFilter={nameFilter}
      />
      <Toggle
        changeDirection={changeDirection}
        direction={listDirection}
      />
      <div className="card-holder">
        {listOrders}
      </div>
    </div>
  );
}

export default App;
