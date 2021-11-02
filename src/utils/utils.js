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
