'use strict'
import { IStorageEngine } from '../storage-engine'
import { formFindNextJobsQuery } from './queries'

/**
 *
 * Fetch next set of jobs to run
 *
 */
function fetchNextJobs ({
  storage,
  interval
}: {
  storage: IStorageEngine
  /**
   *  The general interval of all tasks.
   * Find jobs that have nextRunDate within the execution of the next interval
   */
  interval: string
}) {
  return storage.find({
    query: formFindNextJobsQuery(interval)
  })
}

export default fetchNextJobs
