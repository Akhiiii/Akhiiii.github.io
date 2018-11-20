/*Added routing information  */

import React, { Fragment } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import AdminForm from './pages/form';


function RouterConfig({ history }) {
    return (
      <Fragment>
    
          <ConnectedRouter history={history}>
            <Switch>
             
              <Route path="/" exact component={AdminForm} />
              
            </Switch>
          </ConnectedRouter>
  
      </Fragment>
    );
  }
  
  export default RouterConfig;
  
