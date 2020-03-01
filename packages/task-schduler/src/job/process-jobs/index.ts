'use strict'

import { IJob } from '../interfaces'
import fetchNextJobs from '../fetch-next-jobs'

async function processJobs (this: IJob) {
  const jobs = await fetchNextJobs({
    storage: this.storage,
    interval: this.interval
  })
}

export default processJobs
