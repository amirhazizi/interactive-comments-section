import React, { useState } from "react"
import data from "./data"
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(data.currentUser)
  const [comments, setComments] = useState(data.comments)
  const [showModal, setShowModal] = useState(false)
  const [deleteComment, setDeleteComment] = useState({
    commentID: -1,
    replyID: -1,
  })
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
    const newComment = {
      id: new Date().getTime().toString(),
      content,
      createdAt: "today",
      replies: [],
      score: 0,
      user: {
        ...currentUser,
      },
    }
    setComments([...comments, newComment])
  }
  const addReply = (content, commentID, replyingTo) => {
    const newReply = {
      id: new Date().getTime().toString(),
      content,
      createdAt: "today",
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
    if (replyID === -1) {
      const newComments = comments.filter((comment) => comment.id !== commentID)
      setComments(newComments)
    } else {
      const newComments = comments.map((comment) => {
        if (comment.id === commentID) {
          console.log(comment.replies)
          const newReplies = comment.replies.filter(
            (reply) => reply.id !== replyID
          )
          return { ...comment, replies: newReplies }
        }
        return comment
      })
      setComments(newComments)
    }
  }
  const editOldComment = (content) => {
    const { commentID, replyID } = updateComment
    if (replyID === -1) {
      const newCommants = comments.map((comment) => {
        if (comment.id === commentID) {
          return { ...comment, content }
        }
        return comment
      })
      setComments(newCommants)
    }
  }
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
