// Code snippets that are useful

// usage
// hasParentWithMatchingSelector(myElement, '.some-class-name', ...);
// https://stackoverflow.com/questions/16863917/check-if-class-exists-somewhere-in-parent-vanilla-js

export const hasParentWithMatchingSelector = (
  target,
  selector,
  includeSelf = false
) => {
  if (includeSelf) {
    return [...document.querySelectorAll(selector)].some((el) =>
      el.contains(target)
    )
  } else {
    return [...document.querySelectorAll(selector)].some(
      (el) => el !== target && el.contains(target)
    )
  }
}

export const isString = (any) => {
  return typeof any === "string" || any instanceof String
}

export const getInnerFieldFromObject = (object, stringField) => {
  const subfields = stringField.split(".")

  let value = null
  value = traverseObject(object, subfields)

  return value
}

const traverseObject = (object, subfields) => {
  let value = null

  let newSubFields = subfields
  let field = newSubFields.shift()

  if (newSubFields.length > 0) {
    const newObject = object[field]

    if (newObject) {
      value = traverseObject(newObject, newSubFields)
    } else {
      return null
    }
  }

  if (value === null) {
    return object[field]
  } else {
    return value
  }
}
