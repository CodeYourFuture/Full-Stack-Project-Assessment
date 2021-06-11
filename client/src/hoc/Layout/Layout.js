import React from 'react';

import Aux from '../Auxilary/Auxilary';
import Toolbar from '../../components/navigations/Toolbar/Toolbar';
import Footer from '../../components/Footer/Footer';

const Layout = (props) => {
  return (
    <Aux>
      <Toolbar />
      <main>{props.children}</main>
      <Footer />
    </Aux>
  );
};

export default Layout;
