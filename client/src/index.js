import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import Confirmation from './Confirmation';
import List from './List';
import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';


// Add my subscribers app main component, with routes that hold pages to my home page and confirmation page.
// <BrowserRouter><Route exact path="/" component={Home} />
// <Route exact path="/" component={ConfirmationPage} /> </BrowserRouter>

const SubscribersApp = () => {
  return (
    <BrowserRouter>
      <div className="subscribers-app">
        <Route exact path="/" component={Home} />
        <Route exact path="/confirmation" component={Confirmation} />
      </div>
    </BrowserRouter>)
}

ReactDOM.render(<SubscribersApp />, document.getElementById('root'));
registerServiceWorker();
 
