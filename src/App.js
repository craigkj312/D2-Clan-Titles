import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route } from 'react-router';

import './style/App.css';

import Home from './pages/Home';
import ClanDetails from './pages/ClanDetails';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
            <Route path="/" exact component={Home} />
            <Route path="/c/:groupId/:page" component={ClanDetails} />
            {/*<Footer />*/}
        </HashRouter>
      </div>
    );
  }
}

export default App;
