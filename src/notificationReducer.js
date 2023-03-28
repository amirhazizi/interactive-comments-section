import React from "react"
const notificationReducer = (state, action) => {
  if (action.type == "EMPTY INPUT") {
    return {
      content: "Please enter the value...",
      isShow: true,
      type: "bg-cl_SoftRed",
    }
  } else if (action.type === "COMMENT ADDED") {
    return {
      content: "Comment Added.",
      isShow: true,
      type: "bg-green-500",
    }
  } else if (action.type === "COMMENT REMOVED") {
    return {
      content: "Comment Removed.",
      isShow: true,
      type: "bg-cl_SoftRed",
    }
  } else if (action.type === "COMMENT EDITED") {
    return {
      content: "Comment Edited.",
      isShow: true,
      type: "bg-green-500",
    }
  }
  const tempContent = state.content
  return { content: tempContent, isShow: false, type: "" }
}
export default notificationReducer
