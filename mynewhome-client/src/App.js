import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import General from './components/General/General'
import Buildings from './components/Buildings/Buildings'
import Frame from './components/Frame/Frame'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Frame>
          <div>
            <Route path="/general" component={General} />
            {/* <Route path="/admin/g" component={General} /> */}
            {/* <Route exact path="/admin/sales" component={Sales} /> */}
            <Route path="/buildings" component={Buildings} />
          </div>
        </Frame>
      </BrowserRouter>

    );
  }
}

export default App;
