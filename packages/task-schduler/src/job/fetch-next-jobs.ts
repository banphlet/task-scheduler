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
  interval,
  limit
}: {
  storage: IStorageEngine
  /**
   *  The general interval of all tasks.
   * Find jobs that have nextRunDate within the execution of the next interval
   */
  interval: string
  /**
   * Total jobs to fetch
   */
  limit: number
}) {
  return storage.find({
    query: formFindNextJobsQuery(interval),
    limit
  })
}

export default fetchNextJobs
