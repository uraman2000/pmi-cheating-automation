import image from "../assets/mommy.png"
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      {/* <div className="animate-spin rounded-full h-7 w-auto border-t-2 border-b-2 border-gray-900">
        mommy taba
      </div> */}
      <div className="animate-spin flex flex-col">
        <img className=" h-auto w-14" src={image} alt="mommy taba" />
        
      </div>
    </div>
  )
}

export default Loading
