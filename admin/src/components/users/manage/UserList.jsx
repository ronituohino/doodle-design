import {
  useMutation,
  useQuery,
  useApolloClient,
} from "@apollo/client"
import { useState } from "react"
import { DELETE_ACCOUNT } from "../../../graphql/mutations"
import { ACCOUNT, GET_ACCOUNTS } from "../../../graphql/queries"
import ConfirmDialog from "../../general/ConfirmDialog"
import User from "./User"
import { useSnackbar } from "notistack"

const UserList = ({ userSearchFilter }) => {
  const client = useApolloClient()
  const { enqueueSnackbar } = useSnackbar()
  const { data } = useQuery(GET_ACCOUNTS, {
    variables: { email: userSearchFilter },
  })

  const [modifyDialogOpen, setModifyDialogOpen] = useState(false)
  const [modifyDialogAccount, setModifyDialogAccount] =
    useState(false)
  const openModifyDialog = (account) => {
    setModifyDialogOpen(true)
    setModifyDialogAccount(account)
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteDialogAccount, setDeleteDialogAccount] =
    useState(false)
  const openDeleteDialog = (account) => {
    setDeleteDialogOpen(true)
    setDeleteDialogAccount(account)
  }
  const [deleteAccountMutation] = useMutation(DELETE_ACCOUNT, {
    onCompleted: () => {
      enqueueSnackbar("Account deleted!", {
        variant: "success",
      })

      // Refetch GET_ACCOUNTS query
      // Also refetch ACCOUNT query in case this was the
      // current account we were logged in with
      client.refetchQueries({
        include: [GET_ACCOUNTS, ACCOUNT],
      })
    },
  })

  return (
    <>
      {data && data.getAccounts && (
        <>
          {data.getAccounts.map((account) => (
            <User
              key={account._id}
              account={account}
              openModifyDialog={openModifyDialog}
              openDeleteDialog={openDeleteDialog}
            />
          ))}
        </>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        closeCallback={() => {
          setDeleteDialogOpen(false)
        }}
        title={`Delete account ${deleteDialogAccount.email} ?`}
        text={`This will delete all account data attached to ${deleteDialogAccount.email}, but the orders placed by this account will remain`}
        cancelText="Cancel"
        acceptText="Delete"
        acceptCallback={() => {
          deleteAccountMutation({
            variables: {
              id: deleteDialogAccount._id,
            },
          })
        }}
      />
    </>
  )
}

export default UserList
