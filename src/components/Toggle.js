import React from "react"; 

function Toggle(props){

    //toggle component is a button that on click activates the function passed in as props
    //the other prop is the direction state passed in, indicating the deadline order
    return(
        <div>

            <button className="button" onClick={props.changeDirection}>
                {props.direction}
            </button>

        </div>

    )
}

export default Toggle;

