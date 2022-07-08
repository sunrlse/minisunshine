'use strict'

import clientConfig from './client'
import apiPathMap from './apiPathMap'

const env = process.env.BUILD_ENV || 'master'

const config = {
  env: env,
  client: clientConfig,
  pathMap: apiPathMap,
  apiHost: clientConfig[env].apiHost,
  h5Host: clientConfig[env].h5Host,
}

export default config
