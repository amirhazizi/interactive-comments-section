import { useGlobalContext } from "./GlobalContext"
import { ReplyIcon, MinusIcon, PlusIcon, EditIcon, DeleteIcon } from "./Icons"
const Reply = ({
  content,
  createdAt,
  replyingTo,
  score,
  user: { image, username },
}) => {
  const {
    currentUser: { image: currentUserImg, username: currentUsername },
  } = useGlobalContext()
  return (
    <div className='p-4 space-y-3 bg-white rounded-lg'>
      <div className='flex items-center space-x-4'>
        <img className='h-8' src={image.png} alt={username} />
        <h1 className='font-bold'>{username}</h1>
        {username === currentUsername && (
          <p className='text-cl_White bg-cl_Moderateblue px-2 text-sm rounded-sm'>
            you
          </p>
        )}
        <p className='text-cl_GrayishBlue'>{createdAt}</p>
      </div>
      <p className='text-cl_GrayishBlue'>
        <span className='font-medium text-cl_Moderateblue'>{`@${replyingTo}`}</span>{" "}
        {content}
      </p>
      <div className='flex justify-between'>
        <div className='flex space-x-4 rounded-lg bg-cl_Verylightgray w-fit p-3 py-2 text-cl_Lightgrayishblue'>
          <button>
            <PlusIcon />
          </button>
          <p className='font-medium text-cl_Moderateblue px-px'>{score}</p>
          <button>
            <MinusIcon />
          </button>
        </div>
        {username === currentUsername ? (
          <div className='flex items-center gap-4'>
            <button className='flex items-center gap-2 font-medium text-cl_SoftRed'>
              <DeleteIcon />
              Delete
            </button>
            <button className='flex items-center gap-2 font-medium text-cl_Moderateblue'>
              <EditIcon />
              Edit
            </button>
          </div>
        ) : (
          <button className='flex items-center font-medium text-cl_Moderateblue gap-2'>
            <ReplyIcon />
            Reply
          </button>
        )}
      </div>
    </div>
  )
}
export default Reply
