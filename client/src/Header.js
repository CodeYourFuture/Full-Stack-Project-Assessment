import React from 'react';
import Button from '@material-ui/core/Button';

const Header = ({ ascendingOrder, descendingOrder }) => {
  return (
    <header className='App-header'>
      <div>
        <Button className='ascending' onClick={ascendingOrder} variant='contained' color='default'>
          Asc Order
        </Button>
      </div>
      <div>
        <h1>Video Recommendation</h1>
      </div>
      <div>
        <Button className='descending' onClick={descendingOrder} variant='contained' color='default'>
          Desc Order
        </Button>
      </div>
    </header>
  );
}

export default Header;