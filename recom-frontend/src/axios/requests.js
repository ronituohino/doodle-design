import axios from "axios"

export const getPostalPoints = async (zipCode, amount) => {
  try {
    const response = await axios.get(
      `https://locationservice.posti.com/api/2/location?locationZipCode=${zipCode}&top=${amount}`
    )

    return response.data
  } catch (error) {
    return [{ error: "No points with given zip" }]
  }
}
