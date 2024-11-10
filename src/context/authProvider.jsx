/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { getUser } from "../services/apiUser"

import { AuthContext } from "./authContext"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await getUser()
        setUser(response.data.user)
      } catch (error) {
        console.log(error)
        setUser(null)
      } finally {
        setUserLoading(false)
      }
    }
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, userLoading }}>{children}</AuthContext.Provider>
  )
}
