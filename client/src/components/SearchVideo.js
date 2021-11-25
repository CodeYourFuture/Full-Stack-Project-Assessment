import React, { useState } from 'react';

 export default function SearchVideo ({search}) {
     const [searchInput, setSearchInput] = useState("");

     function handleSearchInput(event) {
       setSearchInput(event.target.value);
     }
     function handleSubmit(event) {
       event.preventDefault();
       search(searchInput);
     }

     return (
       <form onSubmit={handleSubmit} className="form-group search-box">
         <div className="search-row">
           <input
             type="text"
             id="customerName"
             className="form-control"
             placeholder="search video..."
             value={searchInput}
             onChange={handleSearchInput}
           />
           <button type="submit" className="btn btn-primary">
             <i class="fas fa-search"></i>
           </button>
         </div>
       </form>
     );
 }