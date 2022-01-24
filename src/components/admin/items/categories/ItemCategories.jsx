import { List, ListSubheader } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_CATEGORIES } from "../../../../graphql/queries"
import EditableCategory from "./EditableCategory"

const ItemCategories = () => {
  const { data } = useQuery(GET_CATEGORIES)

  return (
    <List>
      <ListSubheader>Categories</ListSubheader>

      {data &&
        data.getCategories &&
        data.getCategories.map((category) => {
          return (
            <EditableCategory
              key={category._id}
              category={category}
            />
          )
        })}

      <EditableCategory add />
    </List>
  )
}

export default ItemCategories
