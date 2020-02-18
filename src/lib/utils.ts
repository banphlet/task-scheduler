'use strict'

export function required(str: Array<any> | string |number |object |Function): any{
    throw new Error(`missing parameter ${str}`)
}