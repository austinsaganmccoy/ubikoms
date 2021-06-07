import React from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import NameForm from "../components/NameForm";
import PasswordForm from "../components/PasswordForm";
import IdentifyForm from "../components/IdentifyForm";

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={NameForm} />
            <Route path="/password" component={PasswordForm} />
            <Route path="/identify" component={IdentifyForm}  />
        </Switch>
    </Router>
);

export default Routes;