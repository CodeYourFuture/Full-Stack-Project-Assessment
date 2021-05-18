import React from 'react';

import Aux from '../Auxilary/Auxilary';
import Toolbar from '../../components/navigations/Toolbar/Toolbar';

const Layout = (props) => {
  return (
    <Aux>
      <Toolbar />
      <main>{props.children}</main>
      <footer className="App">
        <div>
          <h2>Footer Placeholder</h2>
        </div>
      </footer>
    </Aux>
  );
};

export default Layout;
