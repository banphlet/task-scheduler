'use strict'
import { IStorageEngine } from '../storage-engine'
import { computeNextRunDate } from '../lib/utils'

const formQuery = (interval: number) => {
  return {
    nextRunDate: { $lt: computeNextRunDate(interval), $gt: new Date() },
    isRunning: false
  }
}

function fetchNextJobs ({
  storage,
  model,
  interval,
  concurrency
}: {
  storage: IStorageEngine
  model: string
  interval: number
  concurrency: number
}) {
  return storage.find({
    query: formQuery(interval),
    model,
    limit: concurrency
  })
}

module.exports = fetchNextJobs
