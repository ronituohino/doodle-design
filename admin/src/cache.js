import { InMemoryCache } from "@apollo/client"

const cache = new InMemoryCache({ addTypename: false })

export default cache
