import React, { useReducer } from "react"
const reducer = (state, action) => {
  if (action.type == "EMPTY INPUT") {
    return {
      content: "Please enter the value...",
      isShow: true,
      type: "bg-red-500",
    }
  } else if (action.type === "DEFAULT") {
    return { content: "", isShow: false, type: "" }
  }
}
export default reducer
