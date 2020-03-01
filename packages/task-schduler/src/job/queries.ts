'use strict'
import { computeNextRunDate } from '../lib/utils'
/**
 * All Queries fundamentally mongodb queries. Use a db adapter to convert to other storage like mysql,postgres, couchdb, redis etc
 */
const formResolveByNameQuery = (name: string) => {
  return { name: { $eq: name } }
}

/**
 * Form query to find jobs that have nextRunDate within the execution of the next interval
 * @param interval The general interval of the all tasks.
 *
 */
const formFindNextJobsQuery = (interval: string) => {
  return {
    nextRunDate: { $lt: computeNextRunDate(interval) },
    isRunning: false,
    disabled: false
  }
}

const formLockJobQuery = (name: string, interval: string) => {
  return {
    query: { name: { $eq: name } },
    updateObj: { isRunning: true, nextRunDate: computeNextRunDate(interval) }
  }
}

export { formResolveByNameQuery, formFindNextJobsQuery, formLockJobQuery }
