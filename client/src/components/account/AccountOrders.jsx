import { Box, List } from "@mui/material"
import { useAccount } from "../../hooks/useAccount"
import { useQuery } from "@apollo/client"
import PageSubtitle from "./PageSubtitle"
import { GET_ORDERS } from "../../graphql/queries"
import Order from "./Order"

const AccountOrders = () => {
  const account = useAccount()
  const orders = useQuery(GET_ORDERS)

  return (
    <>
      {account.data && account.data.me && (
        <Box>
          <Box sx={{ padding: 2 }}>
            <PageSubtitle text="Orders" />
          </Box>

          {orders.data && orders.data.getOrders && (
            <List>
              {orders.data.getOrders.map((order) => (
                <Order key={order._id} order={order} />
              ))}
            </List>
          )}
        </Box>
      )}
    </>
  )
}

export default AccountOrders
