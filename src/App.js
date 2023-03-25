import React, { useState, useEffect } from "react"
import data from "./data"
import Comment from "./Comment"
function App() {
  const [comments, setComments] = useState(data.comments)
  return (
    <main className='bg-cl_Verylightgray'>
      <div className=' grid gap-4 mx-auto py-10'>
        {comments.map((comment) => {
          return <Comment key={comment.id} {...comment} />
        })}
        <form className='p-4 bg-cl_White rounded-lg space-y-4'>
          <textarea
            className='rounded-lg p-3 border-2'
            cols='30'
            rows='3'
            placeholder='Add a comment...'
          ></textarea>
          <div className='flex justify-between items-center'>
            <img src='' alt='test' />
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
