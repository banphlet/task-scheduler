'use strict'

export interface IQueue{
    nextRun: Date,
    params:object,
    lastRun: Date,
    isRunning: boolean,
    canRun: boolean
}

export interface IStorageEngine {
    findOne: (key: string)=> IQueue,
    save: (key: string, obj: object)=>void,
    removeOne: (key: string)=> IQueue,
    removeMany: (query: object)=> IQueue
    findAll: (query: object)=> Array<IQueue>
}
