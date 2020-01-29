import React from 'react';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { Router, Route } from 'react-router';

import './style/App.css';

import Home from './pages/Home';
import ClanDetails from './pages/ClanDetails';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/c/:groupId/:page" component={ClanDetails} />
            {/*<Footer />*/}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
