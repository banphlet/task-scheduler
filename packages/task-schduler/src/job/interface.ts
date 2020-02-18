'use strict'


export declare interface JobDataSet {
    nextRunAt: Date,
    extraData:any,
    lastRun: Date,
    isRunning: boolean
}