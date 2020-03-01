'use strict'
import { EventEmitter } from 'events'
import add from './add'
import { required } from '../lib/utils'
import { IJobParameters } from './interfaces'
import { IStorageEngine } from '../storage-engine'
import { IAddOptions, IJobQueue } from './interfaces'
import { formResolveByNameQuery } from './queries'

export default class Job extends EventEmitter {
  interval: string
  concurrency: number
  queue: IJobQueue<string> = {}
  storage: IStorageEngine
  constructor (options: IJobParameters) {
    super()
    this.interval = options.interval || '5 seconds'
    this.concurrency = options.concurrency || 20
    this.storage = options.storage
  }

  async add (
    name = required('name'),
    handler = required('handler'),
    options: IAddOptions
  ) {
    const job = await add(this.storage, name, handler, options)
    this.queue[name] = job
    return this
  }

  /**
   *
   *Remove a job from the queue. Also removes the jobs from storage
   */
  async remove (name: string) {
    await this.storage.removeOne({ query: formResolveByNameQuery(name) })
    return this
  }

  start (): void {}
}
