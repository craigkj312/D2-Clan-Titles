import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Router, Route } from 'react-router';

import './style/App.css';

import Home from './pages/Home';
import ClanDetails from './pages/ClanDetails';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/c/:groupId/:page" component={ClanDetails} />
            {/*<Footer />*/}
        </Router>
      </div>
    );
  }
}

export default App;
