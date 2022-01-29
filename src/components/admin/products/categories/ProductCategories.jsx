import { List } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_CATEGORIES } from "../../../../graphql/queries"
import EditableCategory from "./EditableCategory"
import CategorySubtitle from "../../CategorySubtitle"

const ProductCategories = () => {
  const { data } = useQuery(GET_CATEGORIES)

  return (
    <>
      <CategorySubtitle text="Categories" />

      <List>
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
    </>
  )
}

export default ProductCategories
