#!/usr/bin/env node
import 'source-map-support/register'
import {App} from 'aws-cdk-lib'

import {MembaSharedEventBusStack} from './memba-shared-event-bus-stack'
import {getStage, getVersion} from './helpers'
import CONFIG from './config'

const app = new App()
const stage = getStage(app)
const stackName = `${CONFIG.STACK_PREFIX}SharedEventBuseStack-${stage}`

const defaultConfig = {
  stage,
  stackName,
  tags: {
    service: 'shared-event-bus',
    version: 'N/A',
    env: 'dev',
  },
}

const config = {
  dev: {
    env: {
      account: CONFIG.AWS_ACCOUNT_ID_DEV,
      region: CONFIG.REGION,
    },
    tags: {
      ...defaultConfig.tags,
      version: getVersion(),
    },
  },
  prod: {
    env: {
      account: CONFIG.AWS_ACCOUNT_ID_PROD,
      region: CONFIG.REGION,
    },
    tags: {
      ...defaultConfig.tags,
      version: getVersion(),
      env: 'prod',
    },
  },
}

new MembaSharedEventBusStack(app, stackName, {
  ...defaultConfig,
  ...config[stage],
})
