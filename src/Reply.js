import React, { useState } from "react"
import { useGlobalContext } from "./GlobalContext"
import { ReplyIcon, MinusIcon, PlusIcon, EditIcon, DeleteIcon } from "./Icons"
const Reply = ({
  id,
  content,
  createdAt,
  replyingTo,
  score,
  user: { image, username },
  commentID,
}) => {
  const {
    image: currentUserImg,
    username: currentUsername,
    updateScore,
    addReply,
    setShowModal,
    setDeleteComment,
    setUpdateComment,
    editOldComment,
  } = useGlobalContext()
  const [isReply, setIsReply] = useState(false)
  const [replyText, setReplyText] = useState(`@${username} `)
  const [isEdit, setIsEdit] = useState(false)
  const [editReplyID, setEditReplyID] = useState(-1)
  const [editReply, setEditReply] = useState(`@${replyingTo} ${content}`)
  const handleSubmit = (e) => {
    e.preventDefault()
    const replyingText = replyText.slice(username.length + 2)
    if (replyingText) {
      addReply(replyingText, commentID, username)
      setIsReply(false)
      setReplyText(`@${username} `)
    }
  }
  const handleEditSubmit = (e) => {
    e.preventDefault()
    const replyingText = editReply.slice(replyingTo.length + 2)
    if (replyingText) {
      editOldComment(replyingText)
      setIsEdit(false)
      setEditReplyID(-1)
    }
  }
  return (
    <div className='space-y-4'>
      <div className='p-4 bg-white rounded-lg md:flex md:gap-x-6  md:p-6'>
        <div className='hidden md:flex flex-col space-y-3 rounded-lg bg-cl_Verylightgray p-3 py-2 text-cl_Lightgrayishblue items-center self-start w-fit'>
          <button
            onClick={() => {
              updateScore(score + 1, id)
            }}
          >
            <PlusIcon />
          </button>
          <p className='font-medium text-cl_Moderateblue px-px'>{score}</p>
          <button
            onClick={() => {
              updateScore(score - 1, id)
            }}
          >
            <MinusIcon />
          </button>
        </div>
        <div className='md:space-y-2 md:w-full'>
          <div className='flex items-center space-x-4  md:relative'>
            <img className='h-8' src={image.png} alt={username} />
            <h1 className='font-bold'>{username}</h1>
            {username === currentUsername && (
              <p className='text-cl_White bg-cl_Moderateblue px-2 text-sm rounded-sm'>
                you
              </p>
            )}
            <p className='text-cl_GrayishBlue'>{createdAt}</p>
            {username === currentUsername ? (
              <div className='hidden md:flex items-center gap-x-4 md:absolute md:-right-1 md:top-1  md:gap-x-7'>
                <button
                  onClick={() => {
                    setShowModal(true)
                    setDeleteComment({ commentID: id, replyID: -1 })
                  }}
                  className='flex items-center gap-2 font-medium text-cl_SoftRed '
                >
                  <DeleteIcon />
                  Delete
                </button>
                <button
                  onClick={() => {
                    setIsEdit(true)
                    setEditReplyID(id)
                    setUpdateComment({ commentID: id, replyID: -1 })
                  }}
                  className='flex items-center gap-2 font-medium text-cl_Moderateblue'
                >
                  <EditIcon />
                  Edit
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsReply(true)
                }}
                className='hidden md:flex items-center font-medium text-cl_Moderateblue gap-2  md:absolute md:-right-1 md:top-1  '
              >
                <ReplyIcon />
                Reply
              </button>
            )}
          </div>
          {isEdit && editReplyID === id ? (
            <form onSubmit={(e) => handleEditSubmit(e)} className='mt-3'>
              <textarea
                className='rounded-lg p-3 border-2 w-full'
                cols='30'
                rows='3'
                value={editReply}
                placeholder='Add a comment...'
                onChange={(e) => {
                  setEditReply((prevState) => {
                    if (e.target.value.length <= replyingTo.length + 1)
                      return `@${replyingTo} `
                    return e.target.value
                  })
                }}
              ></textarea>
              <div className='flex justify-between'>
                <div className='flex space-x-4 rounded-lg bg-cl_Verylightgray w-fit p-3 py-2 text-cl_Lightgrayishblue items-center md:hidden'>
                  <button
                    onClick={() => {
                      updateScore(score + 1, id)
                    }}
                  >
                    <PlusIcon />
                  </button>
                  <p className='font-medium text-cl_Moderateblue px-px'>
                    {score}
                  </p>
                  <button
                    onClick={() => {
                      updateScore(score - 1, id)
                    }}
                  >
                    <MinusIcon />
                  </button>
                </div>
                <button
                  className='uppercase p-3  w-28 rounded-lg bg-cl_Moderateblue text-cl_White md:ml-auto md:mt-2'
                  type='submit'
                >
                  update
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p className='text-cl_GrayishBlue mb-2'>
                <span className='font-medium text-cl_Moderateblue'>{`@${replyingTo}`}</span>
                {` ${content}`}
              </p>
              <div className='flex justify-between'>
                <div className='flex space-x-4 rounded-lg bg-cl_Verylightgray w-fit p-3 py-2 text-cl_Lightgrayishblue md:hidden'>
                  <button
                    onClick={() => {
                      updateScore(score + 1, commentID, id)
                    }}
                  >
                    <PlusIcon />
                  </button>
                  <p className='font-medium text-cl_Moderateblue px-px'>
                    {score}
                  </p>
                  <button
                    onClick={() => {
                      updateScore(score - 1, commentID, id)
                    }}
                  >
                    <MinusIcon />
                  </button>
                </div>
                {username === currentUsername ? (
                  <div className='flex items-center gap-4 md:hidden'>
                    <button
                      onClick={() => {
                        setDeleteComment({ commentID, replyID: id })
                        setShowModal(true)
                      }}
                      className='flex items-center gap-2 font-medium text-cl_SoftRed'
                    >
                      <DeleteIcon />
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setIsEdit(true)
                        setEditReplyID(id)
                        setUpdateComment({ commentID: commentID, replyID: id })
                      }}
                      className='flex items-center gap-2 font-medium text-cl_Moderateblue'
                    >
                      <EditIcon />
                      Edit
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsReply(true)
                    }}
                    className='flex items-center font-medium text-cl_Moderateblue gap-2 md:hidden'
                  >
                    <ReplyIcon />
                    Reply
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {isReply && (
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
          className='p-4 mt-2 bg-cl_White rounded-lg space-y-4 md:flex md:space-y-0 md:space-x-4  md:p-6'
        >
          <img
            className='h-8 hidden md:block md:mt-2'
            src={currentUserImg.png}
            alt={currentUsername}
          />
          <textarea
            className='rounded-lg p-3 border-2 w-full'
            cols='30'
            rows='3'
            value={replyText}
            placeholder='Add a comment...'
            onChange={(e) =>
              setReplyText((prevState) => {
                if (e.target.value.length <= username.length + 1)
                  return `@${username} `
                return e.target.value
              })
            }
          ></textarea>
          <div className='flex justify-between items-center md:hidden'>
            <img
              className='h-8'
              src={currentUserImg.png}
              alt={currentUsername}
            />
            <button
              className='uppercase p-3  w-28 rounded-lg bg-cl_Moderateblue text-cl_White'
              type='submit'
            >
              reply
            </button>
          </div>
          <button
            className='hidden md:block uppercase p-3  w-28 rounded-lg bg-cl_Moderateblue text-cl_White md:self-start'
            type='submit'
          >
            reply
          </button>
        </form>
      )}
    </div>
  )
}
export default Reply
