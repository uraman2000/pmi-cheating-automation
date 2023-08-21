import image from "../assets/mommy.png"
import image2 from "../assets/mommy2.png"
import image3 from "../assets/mommy3.png"
import image4 from "../assets/4.png"
import image5 from "../assets/5.png"
import image6 from "../assets/6.png"

const arrImage = [image, image2, image3, image4, image5, image6]
const Loading = () => {
  const randomIndex = Math.floor(Math.random() * 5)
  return (
    <div className="flex items-center justify-center h-full">
      {/* <div className="animate-spin rounded-full h-7 w-auto border-t-2 border-b-2 border-gray-900">
        mommy taba
      </div> */}
      <div className="animate-spin flex flex-col">
        <img className=" h-auto w-14" src={arrImage[randomIndex]} alt="mommy taba" />
      </div>
    </div>
  )
}

export default Loading
