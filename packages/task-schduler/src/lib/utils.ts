'use strict'



export function required(str: Array<any> | string |number |object |Function): any {
    throw new Error(`missing parameter ${str}`)
}

export function computeNextRunDate(interval: number){
    const currentDate = new Date()
    return new Date(currentDate.setMilliseconds(currentDate.getMilliseconds()+ interval))
}
