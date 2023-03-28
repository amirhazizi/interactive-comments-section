import React, { useEffect } from "react"
import { useGlobalContext } from "./GlobalContext"

const Notification = () => {
  const { notificationState, notificationDispatch } = useGlobalContext()
  useEffect(() => {
    const timeOut = setTimeout(() => {
      notificationDispatch({ type: "DEFAULT" })
    }, 1500)
    return () => clearTimeout(timeOut)
  }, [notificationState])
  const { content, isShow, type } = notificationState
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
