/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { getUser } from "../services/apiAuth"

import { AuthContext } from "./authContext"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getUser()
        setUser(user)
      } catch (error) {
        console.error(error)
        setUser(null)
      }
    }
    loadUser()
  }, [])

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
