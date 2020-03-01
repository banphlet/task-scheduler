'use strict'

import { required, computeNextRunDate } from '../lib/utils'
import { IStorageEngine } from '../storage-engine'
import { IAddOptions, IAddResponse } from './interfaces'
import { formResolveByNameQuery } from './queries'

/**
 * Add a new job
 * @example
 * const job = new Job()
 * await job.add()
 * @param name Name of the job
 * @param handler Function to process the job
 * @param options  Additional options
 */
async function add (
  storage: IStorageEngine,
  name: string = required('name'),
  handler = required('handler'),
  options: IAddOptions = required('options')
): Promise<IAddResponse> {
  const newItemToAdd = {
    name,
    nextRunDate: computeNextRunDate(options.scheduleInterval),
    disabled: false,
    isRunning: false,
    ...options
  }
  await storage.upsert({
    query: formResolveByNameQuery(name),
    data: newItemToAdd
  })
  return {
    handler,
    name,
    scheduleInterval: options.scheduleInterval,
    customData: options.customData
  }
}

export default add
