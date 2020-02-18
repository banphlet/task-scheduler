'use strict'
import { required } from '../lib/utils'

export declare interface FindParameters {
  /**
   * model or collection name
   */
  model: string
  /**
   * query object. By default uses a mongodb query format
   */
  query: object
  /**
   * Sort criteria. By default uses a mongodb sort format
   */
  sort?: object
  limit: number
}

export declare interface CreateParameters {
  /**
   * model or collection name
   */
  model: string
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
   * model or collection name
   */
  model: string
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
  insert: ({ model, data }: CreateParameters) => {}
  /**
   * Find all jobs that meet a criteria
   */
  find: ({ model, query, sort, limit }: FindParameters) => Promise<Array<any>>
  /**
   * Get a single job
   */
  findOne: ({ model, query }: { model: string; query: object }) => any
  /**
   * Update single or multiple jobs
   */
  update: ({ query, updateObj, model }: UpdateParameters) => any
  /**
   * Delete single job
   */
  removeOne: ({ model, query }: { model: string; query: object }) => any
  /**
   * Removes all jobs
   */
  clear: ({ model, query }: { model: string; query: object }) => any
}

/**
 *
 * Base storage engine
 *
 */
function storageEngine (db = required('db')): IStorageEngine {
  return {
    insert: function ({ data = required('data'), model = required('model') }) {
      return db.create({ model, data })
    },
    find: function ({
      model = required('model'),
      query = required('query'),
      sort = {},
      limit
    }): Promise<Array<any>> {
      return db.find({ model, query, sort, limit })
    },
    findOne: function (query = required('query')): any {
      return db.findOne(query)
    },
    update: function ({
      query = required('query'),
      model = required('model'),
      updateObj = required('updateObj')
    }) {
      return db.update({ model, query, update: updateObj })
    },
    removeOne: function ({
      query = required('query'),
      model = required('model')
    }) {
      return db.removeOne({ model, query })
    },
    clear: function ({ model = required('model'), query = required('query') }) {
      return db.removeMany({ model, query })
    }
  }
}

export default storageEngine
