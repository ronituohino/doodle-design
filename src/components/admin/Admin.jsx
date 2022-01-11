import { useState, useEffect } from "react"

import { useRouting } from "../../hooks/useRouting"
import { useAccount } from "../../hooks/useAccount"
import AdminDrawer from "./AdminDrawer"

const Admin = () => {
  const { data } = useAccount()
  const { openLink, homeLink } = useRouting()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (data && data.me) {
      if (
        !(
          data.me.accountType === "Admin" ||
          data.me.accountType === "Support"
        )
      ) {
        console.log("Not an admin account")
        openLink(homeLink())
      } else {
        setIsAdmin(true)
      }
    }
  }, [data])

  return <>{isAdmin && <AdminDrawer />}</>
}

export default Admin
