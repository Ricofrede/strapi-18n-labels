/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import useLocales from './useLocales';
import useAuth from './useAuth';

const HomePage = () => {
  const jwt = useAuth()
  const locales = jwt && useLocales(jwt)
  
  function handleSubmit(event){
    event.preventDefault()

    const form = event.target
    const children = form.children
    const body = {}

    if (!children[0].lastChild.value) return

    const labelKey = children[0].lastChild.value
    children[0].lastChild.value = null
    body[labelKey] = {}

    for (let child of children){
      if ((child.lastChild.id !== 'labelKey') && (child.id !== 'form-submit')){
        body[labelKey][child.lastChild.id] = child.lastChild.value
      }
    }

    fetch("http://localhost:1337/i18n-labels/write",{
      method: "POST",
      headers: {
        "Content-Type" : "text/plain",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify(body)
    })
  }

  return (
    <div>
      <h1>Add New i18n Labels</h1>

      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label htmlFor="labelKey">Label Key</label>
          <input type="text" class="form-control" id="labelKey" name="labelKey" />
        </div>
        {locales && locales.map(loc => {
          return (<div class="form-group" key={loc}>
            <label htmlFor={loc}>{loc}</label>
            <input type="text" class="form-control" id={loc} name={loc}/>
          </div>)
        })}
        <button type="submit" id="form-submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default memo(HomePage);
