import React, { useEffect } from "react"
import { useGlobalContext } from "./GlobalContext"

const Notification = () => {
  const {
    notificationState,
    notificationDispatch,
    setShowNotification,
    showNotification,
  } = useGlobalContext()

  const { content, isShow, type } = notificationState
  useEffect(() => {
    const timeOut = setTimeout(() => {
      notificationDispatch({ type: "DEFAULT" })
    }, 1000)
    return () => clearTimeout(timeOut)
  }, [isShow])
  return (
    <div
      className={`notification fixed top-0 left-1/2 text-white rounded-b-xl w-fit p-2 px-4 z-10 ${type} ${
        isShow && "show-notification"
      } `}
    >
      {content}
    </div>
  )
}
export default Notification
