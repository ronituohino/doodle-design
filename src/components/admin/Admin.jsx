import { useAccount } from "../../hooks/useAccount"
import { useRouting } from "../../hooks/useRouting"
import AdminDrawer from "./AdminDrawer"

const Admin = () => {
  const { data } = useAccount()
  const { openHome } = useRouting()

  if (
    data &&
    data.me &&
    !(
      data.me.accountType === "Admin" ||
      data.me.accountType === "Support"
    )
  ) {
    console.log(data)
  }

  return (
    <>
      <AdminDrawer />
    </>
  )
}

export default Admin
