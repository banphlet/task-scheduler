'use strict'
import * as BlueBirdPromise from 'bluebird'
import { IJob } from '../interfaces'
import fetchNextJobs from '../fetch-next-jobs'

import { formLockJobQuery } from '../queries'

async function processJobs (this: IJob) {
  const jobs = await fetchNextJobs({
    storage: this.storage,
    interval: this.interval,
    limit: this.concurrency
  })
  const self = this
  return BlueBirdPromise.Promise.map(
    jobs,
    async function mapper (job) {
      // lock this job before processing
      await self.storage.update(
        formLockJobQuery(job.name, job.scheduleInterval)
      )
      const queue = self.queue[job.name]
      await queue?.handler(job.customData)
    },
    {
      concurrency: this.concurrency
    }
  )
}

export default processJobs
