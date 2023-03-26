import React, { useState, useEffect } from "react"
import data from "./data"
import Comment from "./Comment"
import { useGlobalContext } from "./GlobalContext"
function App() {
  const {
    image: currentUserImg,
    username: currentUsername,
    comments,
  } = useGlobalContext()

  return (
    <main className='bg-cl_Verylightgray'>
      <div className=' grid gap-4 mx-auto py-10'>
        {comments.map((comment) => {
          return <Comment key={comment.id} {...comment} />
        })}
        <form className='p-4 bg-cl_White rounded-lg space-y-4'>
          <textarea
            className='rounded-lg p-3 border-2 w-full'
            cols='30'
            rows='3'
            placeholder='Add a comment...'
          ></textarea>
          <div className='flex justify-between items-center'>
            <img
              className='h-8'
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
        </form>
      </div>
    </main>
  )
}

export default App
