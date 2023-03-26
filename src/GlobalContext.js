import data from "./data"
import React, { useState } from "react"
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(data.currentUser)
  return (
    <AppContext.Provider value={currentUser}>{children}</AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return React.useContext(AppContext)
}
export { AppContext, AppProvider }
