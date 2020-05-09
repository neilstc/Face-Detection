import React from 'react'



const Rank = ({entries, user}) => {
    return (
        <div className='ma4 mt0'>
            <div className='white f3'>
            {`${user} YOUR CURRENT RANK IS ...`}
                </div>
                <div className='white f3'>
                      {entries}
                </div>
         </div>
 
  

    );
}


export default Rank;