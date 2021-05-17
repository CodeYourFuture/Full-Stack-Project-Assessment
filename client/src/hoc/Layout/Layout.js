import React from 'react';

import Aux from '../Auxilary/Auxilary';

const Layout = (props) => {
  return (
    <Aux>
      <nav>
        <div>
          <h2>Nav Placeholder</h2>
        </div>
      </nav>
      <main>{props.children}</main>
      <footer>
        <div>
          <h2>Footer Placeholder</h2>
        </div>
      </footer>
    </Aux>
  );
};

export default Layout;
