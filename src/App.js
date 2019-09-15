import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BiorhythmEntriesView from './biorhythm-entries/BiorhythmEntriesView';
import GraphView from './graph/GraphView';
import NotFound from './NotFound';

function App() {
  return (
    <div className="mx-5 md:mx-10 lg:mx-20 h-full" >
        <Router>
            <Switch>
                <Route path='/' exact component={BiorhythmEntriesView} /> 
                <Route path='/graph/:graphId'exact component={GraphView} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
