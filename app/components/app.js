import React from 'react';
import MarkDown from './markdown.js';
import { BrowserRouter ,Route, Switch} from 'react-router-dom';

export default class App extends React.Component {
    render(){
      return (
        <BrowserRouter>
          <div className="container">
            <h1> GitHub MarkDown Previewer </h1> 
            <Switch>
              <Route exact path='/' component={ MarkDown }/>
              <Route render={ function(){
                return (<p>404 Page Not Found..</p>);
              }}></Route>
            </Switch> 
          </div>
        </BrowserRouter>
      );
    }
}
