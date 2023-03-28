import React, { useState, useEffect, useReducer } from "react"
import data from "./data"
import notificationReducer from "./notificationReducer"
const AppContext = React.createContext()
const defaultData =
  JSON.parse(localStorage.getItem("interactive-comment-section")) ||
  data.comments
const defaultState = { content: "", isShow: false, type: "" }

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(data.currentUser)
  const [comments, setComments] = useState(defaultData)
  const [showModal, setShowModal] = useState(false)
  const [deleteComment, setDeleteComment] = useState({
    commentID: -1,
    replyID: -1,
  })
  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    defaultState
  )
  const [updateComment, setUpdateComment] = useState({
    commentID: -1,
    replyID: -1,
  })
  const updateScore = (newScore, commentID, replayID = -1) => {
    let value = newScore
    if (value < 0) value = 0
    const newComments = comments.map((comment) => {
      if (comment.id === commentID) {
        if (replayID == -1) {
          return { ...comment, score: value }
        }
        const newReply = comment.replies.map((reply) => {
          if (reply.id === replayID) {
            return { ...reply, score: value }
          }
          return reply
        })
        return { ...comment, replies: newReply }
      }
      return comment
    })
    setComments(newComments)
  }
  const addComment = (content) => {
    const date = new Date().getTime()
    const newComment = {
      id: date.toString(),
      content,
      createdAt: date,
      replies: [],
      score: 0,
      user: {
        ...currentUser,
      },
    }
    setComments([...comments, newComment])
  }
  const addReply = (content, commentID, replyingTo) => {
    const date = new Date().getTime()
    const newReply = {
      id: date.toString(),
      content,
      createdAt: date,
      replies: [],
      score: 0,
      replyingTo,
      user: {
        ...currentUser,
      },
    }
    const newComments = comments.map((comment) => {
      if (comment.id === commentID) {
        comment.replies = [...comment.replies, newReply]
      }
      return comment
    })
    setComments(newComments)
  }
  const removeComment = () => {
    const { commentID, replyID } = deleteComment
    let newComments = []
    if (replyID === -1) {
      newComments = comments.filter((comment) => comment.id !== commentID)
    } else {
      newComments = comments.map((comment) => {
        if (comment.id === commentID) {
          const newReplies = comment.replies.filter(
            (reply) => reply.id !== replyID
          )
          return { ...comment, replies: newReplies }
        }
        return comment
      })
    }
    setComments(newComments)
  }
  const editOldComment = (content) => {
    const { commentID, replyID } = updateComment
    let newComments = []
    if (replyID === -1) {
      newComments = comments.map((comment) => {
        if (comment.id === commentID) {
          return { ...comment, content }
        }
        return comment
      })
    } else {
      newComments = comments.map((comment) => {
        if (comment.id === commentID) {
          const newReplies = comment.replies.map((reply) => {
            if (reply.id === replyID) {
              return { ...reply, content }
            }
            return reply
          })
          return { ...comment, replies: newReplies }
        }
        return comment
      })
    }
    setComments(newComments)
  }
  useEffect(() => {
    localStorage.setItem(
      "interactive-comment-section",
      JSON.stringify(comments)
    )
  }, [comments])

  return (
    <AppContext.Provider
      value={{
        ...currentUser,
        comments,
        updateScore,
        addComment,
        addReply,
        showModal,
        setShowModal,
        removeComment,
        setDeleteComment,
        editOldComment,
        setUpdateComment,
        notificationState,
        notificationDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return React.useContext(AppContext)
}
export { AppContext, AppProvider }
