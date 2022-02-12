import React from 'react';
import Button from './Button';

const Header = ({ onAdd, showAdd }) => {

  return (
  <div>
      <header className="App-header">
        <h1>Video Recommendation</h1> <Button color={showAdd ? 'red':'green'} text={showAdd ? 'Close form':'Add Video'} onClick={onAdd} />
      </header>
  </div>
  )
};

export default Header;
