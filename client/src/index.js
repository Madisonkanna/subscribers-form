import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';


// Add my subscribers app main component, with routes that hold pages to my home page and confirmation page.
// <Route exact path="/" component={Home} />
// <Route exact path="/" component={ConfirmationPage} />


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
 
