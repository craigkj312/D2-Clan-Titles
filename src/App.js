import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route } from 'react-router';

import './style/App.css';

import Header from './components/Header';
// import Footer from './components/Footer';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/u/:type/:id" component={UserDetails} />
            {/*<Footer />*/}
        </HashRouter>
      </div>
    );
  }
}

export default App;
