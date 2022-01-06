import { useCallback, useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"

const FormikAutoSave = ({ formik, onSave, debounceMs = 300 }) => {
  const debouncedSubmit = useCallback(
    useDebouncedCallback(() => {
      formik.submitForm()

      if (onSave) {
        onSave()
      }
    }, debounceMs),
    [formik.submitForm, debounceMs]
  )

  useEffect(() => debouncedSubmit, [debouncedSubmit, formik.values])

  return <></>
}

export default FormikAutoSave
