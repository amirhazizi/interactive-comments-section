import React, { useEffect } from "react"
import { useGlobalContext } from "./GlobalContext"

const Notification = () => {
  const { notificationState, dispatch } = useGlobalContext()
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch({ type: "DEFAULT" })
    }, 3000)
    return () => clearTimeout(timeOut)
  }, [])
  return (
    <div
      className={`fixed top-0 left-1/2 text-white -translate-x-1/2 rounded-b-xl w-fit p-2 z-10 ${notificationState.type} `}
    >
      {notificationState.content}
    </div>
  )
}
export default Notification
