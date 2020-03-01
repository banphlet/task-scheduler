'use strict'
const humanInterval = require('human-interval')

const isDate = (date: Date) =>
  Object.prototype.toString.call(date) === '[object Date]'

export function parseDate (interval: string | Date): number {
  return humanInterval(interval)
}

export function required (
  str: Array<any> | string | number | object | Function
): any {
  throw new Error(`missing parameter ${str}`)
}

export function computeNextRunDate (interval: string) {
  const currentDate = new Date()
  return new Date(
    currentDate.setMilliseconds(
      currentDate.getMilliseconds() + parseDate(interval)
    )
  )
}
