/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { useState } from 'react';
import AddLabels from './AddLabels';
// import PropTypes from 'prop-types';
import useAuth from './useAuth';

const HomePage = () => {
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)
  const [submit, setSubmit] = useState(null)
  const jwt = useAuth(user,password,submit)

  function login(event){
    event.preventDefault()
    setSubmit(true)
  }

  return (
    <div className="labelsArc">
      {!jwt && <div>
        <div className="authHeader">
          <h1>Authenticate</h1>
          <h4>Use an authenticated user with rights to add new labels</h4>
        </div>

        <form onSubmit={login}>
          <label htmlFor="user">Authenticated User</label>
          <input type="text" class="form-control" id="user" name="user" onChange={chg => setUser(chg.target.value)}/>
          <label htmlFor="password">Password</label>
          <input type="password" class="form-control" id="password" name="password" onChange={chg => setPassword(chg.target.value)}/>
          <button type="submit" id="login-submit" class="btn btn-primary labelsBtn">Login</button>
        </form>
      </div>}
      {jwt && <AddLabels jwt={jwt}/>}

      <div className="info">
        <p> You may fetch for the existing labels at <a href={window.location.href.split("/admin/")[0] + "/i18n-labels"}>{window.location.href.split("/admin/")[0] + "/i18n-labels"}</a></p>
      </div>
      
    </div>
  );
};

export default memo(HomePage);
