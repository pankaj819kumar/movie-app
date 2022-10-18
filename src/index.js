// import React, { createContext } from 'react';
import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

// function logger(obj, next, action)
// logger(obj)(next)(action)     // curried form
// const logger = function ({ dispatch, getState }) {  //gets an object
//   return function (next) {
//     return function (action) {
//       // middleware code
//       console.log('ACTION TYPE = ', action.type);
//       next(action);   // next is next middleware, so next middleware will be called
//     }
//   }
// }
// second way
const logger = ({ dispatch, getState }) => (next) => (action) => {
  // middleware code
  if (typeof action !== 'function') {
    console.log('ACTION TYPE = ', action.type);
  } 
  next(action);   // next is next middleware, so next middleware will be called
}

// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   // middleware code
//   if (typeof action === 'function') {
//     action(dispatch);
//     return;
//   }
//   next(action);   // next is next middleware, so next middleware will be called
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('store', store.getState());

// export const StoreContext = createContext();

// console.log('StoreContext', StoreContext);

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

// const connectedAppComponent = connect(callback)(App);
// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component{
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }
//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBePassedAsProps = callback(state);
//                           // same as movies={movies} search={search}
//         return <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => <ConnectedComponent store={store} />}
//           </StoreContext.Consumer>);
//       }
//     }

//     return ConnectedComponentWrapper;
//   }
// }

// console.log("before dis", store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{ name: 'Superman' }]
// })
// console.log("after dis", store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
