import React, { useEffect, useState } from "react"; 

function Search(props){

    //search bar component for filter results in the parent component
    //define state for the number used in the form
    const [number, setNumber] = useState(0);

    //on change in the form input, this function is run
    //taking the event target value, it both updates component state and gives a paramater to the function passed in as props to trigger filter in parent component
    const handleChange = function(event){
    
        setNumber(event.target.value);
        props.nameFilter(event.target.value);
    }

    //render the form, collects numbers
    return(

            <div className="search">
                <form>
                    
                    <label className ="search-label" htmlFor="input">
                            Search by ID, 0 filters none
                    </label>
                    
                    <input
                        type="number"
                        id="name-input"
                        name="number"
                        value={number}
                        onChange={handleChange}
                        placeholder="Id"
                        minimum="0"
                        max="4"
                        min="0"
                    />
                </form>
            </div>
    )
}

export default Search;

