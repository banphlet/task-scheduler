'use strict'

import { required } from "../lib/utils"

const TOTAL_DEFAULT_CONCURRENCY = 20

export declare interface AddOptions{
    /**
     * Total number of jobs to be running at any point in time
     */
    totalConcurrency?: number,
    /**
     * Schedule period to run the job. 
     * @example
     *  Every friday. Every day at 5pm. Every tuesday
     * 
     */
    schedulePeriod: number | string,
    /**
     * Any custom data you want to be passed to the job handler
     */
    customData?: any
}
export declare interface AddDefinitions extends AddOptions{
    handler: ()=> any,
}

type AddParameters <D extends string>  = {
[key in D]: AddDefinitions
}

let parameters: AddParameters<string> = {}


/**
 * Add a new job
 * @param name Name of the job
 * @param handler Function to process the job
 * @param options  Additional options
 */
function add(name: string =required("name"), handler= required("handler"), options:AddOptions =required("options")): AddParameters<string>{
    parameters[name]= {
        handler,
        totalConcurrency: options.totalConcurrency || TOTAL_DEFAULT_CONCURRENCY,
        schedulePeriod: options.schedulePeriod,
        customData: options.customData 
    }
    return parameters
}




export default add