import React from 'react';


const Form = (props) => {
  return(
    <div className="form_div">
        <p>Please select dates to visualize data for particular period</p> 
        <form onSubmit={props.getData} className="form_info">
            <label className="label">
                From:
                <input type="date" name="from" min="2020-01-31" placeholder="From" />
            </label>
            <label className="label"> To:
                <input type="date" name="to" min="2020-01-31" placeholder="To..." />
            </label>
            <button>ShowData</button>
        </form>
        <div className="error">{props.error}</div>
    </div>
  )
}



export default Form;