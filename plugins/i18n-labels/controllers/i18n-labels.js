'use strict';
const fs = require('fs')
const fetch = require('node-fetch')
let labels
try {
  labels = require('../../../labels.json') || {}
} catch {
  labels = {}
}

/**
 * i18n-labels.js controller
 *
 * @description: A set of functions called "actions" of the `i18n-labels` plugin.
 */

module.exports = {

  read: async () => {
    return labels || {}
  },
  write: async (ctx) => {
    const labMod = labels || {}
    const body = JSON.parse(ctx.request.body) || {}

    Object.keys(body).map(key =>{
      labMod[key] = body[key]
    })

    const finalLabels = JSON.stringify(labMod)

    fs.writeFile('labels.json', finalLabels, (err) => {
      if (err) {
          throw err;
      }
      console.log("JSON data is saved.");
  });
  }
};
