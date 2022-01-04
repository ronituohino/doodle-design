import { useState, useCallback, useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"

const FormikAutoSave = ({ formik, debounceMs = 1000 }) => {
  const [isSaved, setIsSaved] = useState(null)

  const debouncedSubmit = useCallback(
    useDebouncedCallback(() => {
      formik.submitForm().then(() => setIsSaved(true))
    }, debounceMs),
    [formik.submitForm, debounceMs]
  )

  useEffect(() => debouncedSubmit, [debouncedSubmit, formik.values])
  return (
    <p className="text-center text-success">
      {formik.isSubmitting ? "Saving..." : "Your changes saved."}
    </p>
  )
}

export default FormikAutoSave
