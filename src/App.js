import React, { useState, useEffect } from "react"
import data from "./data"
import Comment from "./Comment"
import { useGlobalContext } from "./GlobalContext"
import Modal from "./Modal"
function App() {
  const {
    image: currentUserImg,
    username: currentUsername,
    comments,
    addComment,
    showModal,
  } = useGlobalContext()
  const [message, setMessage] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    if (message) {
      addComment(message)
      setMessage("")
    }
  }

  return (
    <main
      className={`bg-cl_Verylightgray ${
        showModal && "overflow-hidden h-screen"
      }`}
    >
      {showModal && <Modal />}
      <div className=' grid gap-4 mx-auto py-10 md:py-14'>
        {comments.map((comment) => {
          return <Comment key={comment.id} {...comment} />
        })}
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
          className='p-4 bg-cl_White rounded-lg space-y-4 md:flex md:space-y-0 md:space-x-4 md:p-6'
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
            value={message}
            placeholder='Add a comment...'
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className='flex justify-between items-center md:hidden'>
            <img
              className=' h-8'
              src={currentUserImg.png}
              alt={currentUsername}
            />
            <button
              className='uppercase p-3 w-24 rounded-lg bg-cl_Moderateblue text-cl_White'
              type='submit'
            >
              send
            </button>
          </div>
          <button
            className='hidden md:block uppercase p-3 w-28 rounded-lg bg-cl_Moderateblue text-cl_White md:self-start'
            type='submit'
          >
            send
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
