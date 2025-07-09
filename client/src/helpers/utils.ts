
export function isEmptyObject(obj: object) {
  return (Object.keys(obj).length === 0)
}

export function isFormContainsErrors(obj: object) {
  return isEmptyObject(obj) || (Object.keys(obj).length === 1 && Object.hasOwn(obj, "root"))

}

