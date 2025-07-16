
export function isEmptyObject(obj: object) {
  return (Object.keys(obj).length === 0)
}

export function isFormContainsErrors(obj: object) {
  return isEmptyObject(obj) || (Object.keys(obj).length === 1 && Object.hasOwn(obj, "root"))

}

export function dateToYMD(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date)
  }
  return date.toISOString().slice(0, 10)
}

