
import dva from 'dva';
import RouterConfig from './router';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
// 1. Initialize the app  with  intial value 

const app = dva({
    history: createHistory(),               // to  manage session history 
  });
  
// 2. Plugins
app.use(createLoading());     // loading attribute will be set true / false 
  
// 2. call app model

app.model(require('./pages/formModal').default);
//3 . call router file
app.router(RouterConfig);
// app.router(require('./router').default);          // another way to write

// 4. start app
app.start('#root');