'use strict'
import { required } from '../lib/utils'
import { IJobDataSet } from '../job/interfaces'

export declare interface FindParameters {
  /**
   * query object. By default uses a mongodb query format
   */
  query: object
  /**
   * Sort criteria. By default uses a mongodb sort format
   */
  sort?: object
  limit?: number
}

export declare interface IUpsertParameters {
  /**
   * job data to insert into db
   */
  data: any
  /**
   * query object. By default uses a mongodb query format
   */
  query: object
}

export declare interface CreateParameters {
  /**
   * job data to insert into db
   */
  data: any
}
export declare interface UpdateParameters {
  /**
   * query object
   */
  query: object
  /**
   * Update object
   */
  updateObj: object
}

/**
 * Storage interface for creating, updating, deleting and getting jobs
 */

export declare interface IStorageEngine {
  /**
   * insert new job
   */
  insert: ({ data }: CreateParameters) => Promise<any>
  upsert: ({ query, data }: IUpsertParameters) => Promise<any>
  /**
   * Find all jobs that meet a criteria
   */
  find: ({ query, sort, limit }: FindParameters) => Promise<Array<IJobDataSet>>
  /**
   * Get a single job
   */
  findOne: ({ query }: { query: object }) => Promise<any>
  /**
   * Update single or multiple jobs
   */
  update: ({ query, updateObj }: UpdateParameters) => Promise<any>
  /**
   * Delete single job
   */
  removeOne: ({ query }: { query: object }) => Promise<any>
  /**
   * Removes all jobs
   */
  clear: ({ query }: { query: object }) => Promise<any>
}

/**
 *
 * Base storage engine
 *
 */
function storageEngine (
  db = required('db'),
  model: string = required('model')
): IStorageEngine {
  return {
    insert: function ({ data = required('data') }) {
      return db.create({ model, data })
    },
    upsert: async function ({
      query = required('query'),
      data = required('data')
    }) {
      const item = await this.findOne({ query })
      if (item) return item
      return this.insert({ data })
    },
    find: function ({
      query = required('query'),
      sort = {},
      limit
    }): Promise<Array<any>> {
      return db.find({ model, query, sort, limit })
    },
    findOne: function (query = required('query')): any {
      return db.findOne({ query, model })
    },
    update: function ({
      query = required('query'),
      updateObj = required('updateObj')
    }) {
      return db.update({ model, query, update: updateObj })
    },
    removeOne: function ({ query = required('query') }) {
      return db.removeOne({ model, query })
    },
    clear: function ({ query = required('query') }) {
      return db.removeMany({ model, query })
    }
  }
}

export default storageEngine
