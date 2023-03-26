import data from "./data"
import React, { useState } from "react"
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(data.currentUser)
  const [comments, setComments] = useState(data.comments)

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
  const addComment = (text) => {
    const newComment = {
      id: new Date().getTime().toString(),
      content: text,
      createdAt: "today",
      replies: [],
      score: 0,
      user: {
        ...currentUser,
      },
    }
    setComments([...comments, newComment])
  }
  return (
    <AppContext.Provider
      value={{ ...currentUser, comments, updateScore, addComment }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return React.useContext(AppContext)
}
export { AppContext, AppProvider }
