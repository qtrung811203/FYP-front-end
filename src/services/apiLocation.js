import axios from "axios"

export async function getProvinces() {
  try {
    const response = await axios.get("https://open.oapi.vn/location/provinces?size=63")
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export async function getDistrictsByProvinceId(provinceId) {
  try {
    const response = await axios.get(`https://open.oapi.vn/location/districts/${provinceId}`)
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export async function getWardsByDistrictId(districtId) {
  try {
    const response = await axios.get(`https://open.oapi.vn/location/wards/${districtId}`)
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}
