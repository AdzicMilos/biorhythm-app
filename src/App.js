import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import BiorhythmView from './participant/BiorhythmView';
import GraphView from './graph/GraphView';
import NotFound from './NotFound';

function App() {
  return (
    <div className="App mx-5 md:mx-10 lg:mx-20" >
        <Router>
            <Switch>
                <Route path='/' exact component={BiorhythmView} /> 
                <Route path='/graph/'exact component={GraphView} />
                <Route path='/details/:detailsId'exact component={GraphView} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
