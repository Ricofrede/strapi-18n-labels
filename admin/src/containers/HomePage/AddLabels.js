/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import useLocales from './useLocales';

const AddLabels = ({jwt}) => {
  const locales = useLocales(jwt)
  const baseUrl = window.location.href.split("/admin/")[0]
  
  function handleSubmit(event){
    event.preventDefault()

    const form = event.target
    const children = form.children
    const body = {}

    const labelKey = children[0].lastChild.value
    children[0].lastChild.value = null
    body[labelKey] = {}

    for (let child of children){
      if ((child.lastChild.id !== 'labelKey') && (child.id !== 'form-submit') && (child.id !== 'translations')){
        body[labelKey][child.lastChild.id] = child.lastChild.value
        child.lastChild.value = null
      }
    }

    fetch(baseUrl + "/i18n-labels/write",{
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
        <div class="form-group labelKey">
          <label htmlFor="labelKey">Label Key</label>
          <input type="text" class="form-control" id="labelKey" name="labelKey" />
        </div>
        <h3 className="translations" id="translations">Translations</h3>
        {locales && locales.map(loc => {
          return (
          <div class="form-group" key={loc}>
            <label htmlFor={loc}>{loc}</label>
            <input type="text" class="form-control" id={loc} name={loc}/>
          </div>
          )
        })}
        <button type="submit" id="form-submit" class="btn btn-primary labelsBtn">Submit</button>
      </form>
    </div>
  );
};

export default memo(AddLabels);
