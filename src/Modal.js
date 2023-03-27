import { useGlobalContext } from "./GlobalContext"
const Modal = () => {
  const { setShowModal, removeComment } = useGlobalContext()
  return (
    <div className='fixed top-0 left-0 w-full min-h-screen bg-cl_GrayishBlue bg-opacity-70 grid place-items-center p-5'>
      <div className='bg-white p-5 grid gap-y-3 rounded-md max-w-sm'>
        <h1 className='text-2xl font-medium'>Delete comment</h1>
        <p className='max-w-xs text-cl_GrayishBlue opacity-75 mt-2'>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className='grid grid-cols-2 gap-x-4 justify-between text-cl_White'>
          <button
            onClick={() => setShowModal(false)}
            className='bg-cl_GrayishBlue uppercase  p-2 py-3 rounded-lg'
          >
            no, cancele
          </button>

          <button
            onClick={() => {
              removeComment()
              setShowModal(false)
            }}
            className='bg-cl_SoftRed uppercase  p-2 py-3 rounded-lg'
          >
            yes, delete
          </button>
        </div>
      </div>
    </div>
  )
}
export default Modal
