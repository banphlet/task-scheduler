'use strict'
import { IStorageEngine } from '../storage-engine'

export declare interface IJobDataSet {
  nextRunAt: Date
  customData: any
  lastRun: Date
  isRunning: boolean
  disabled: boolean
}

export declare interface IJobParameters {
  /**
   * Total number of jobs that can be running at any given time
   */
  concurrency?: number
  /**
   *Next occurrence of process
   */
  interval?: string
  /**
   * An instance of Storage Class
   */
  storage: IStorageEngine
}

export declare interface IAddOptions {
  /**
   * Schedule period to run each job.
   * @example
   *  Every friday. Every day at 5pm. Every tuesday
   *
   */
  scheduleInterval: string
  /**
   * Any custom data you want to be passed to the job handler
   */
  customData?: any
}

export declare interface IAddResponse extends IAddOptions {
  handler?: () => any
  name?: string
}

export type IJobQueue<D extends string> = { [key in D]?: IAddResponse }

export declare class IJob {
  interval: string
  concurrency: number
  queue: IJobQueue<string>
  storage: IStorageEngine

  add (name: string, handler: string, options: IAddOptions): Promise<IJob>
}
