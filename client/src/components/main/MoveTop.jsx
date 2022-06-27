import React, { useState } from 'react';

const MoveTop = () => {
    return ( 
        <div className='move-top' onClick={()=>window.scrollTo(0,0)}>
            top
        </div>
     );
}
 
export default MoveTop;