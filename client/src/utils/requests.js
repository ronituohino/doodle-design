export const getPostalPoints = async (zipCode, amount) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
      resolve(JSON.parse(xhr.response))
    })
    xhr.addEventListener("error", () => {
      reject("error fetching from Posti API")
    })
    xhr.open(
      "GET",
      `https://locationservice.posti.com/api/2/location?locationZipCode=${zipCode}&top=${amount}`
    )
    xhr.send()
  })
}
