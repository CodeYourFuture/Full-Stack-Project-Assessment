import React, { useState } from 'react'
import "./Header.css";
import {FormControlLabel, Radio,RadioGroup} from '@material-ui/core';
function Header() {

    const [sorted, setSorted] = useState('desc');

	

    return (
        <div>
         <header className="header">
             <h1>Video Recommendation</h1>
             <RadioGroup value={sorted} onChange={(e)=>setSorted(e.target.value)}>
               <FormControlLabel value="asc" control={<Radio/>}  label="Accending" />
               <FormControlLabel value="desc" control={<Radio/>}  label="Deccending" />
             </RadioGroup>
             
         </header>   
        </div>
    )
}

export default Header
