"use client"
import Image from 'next/image'
import ErrorImage from '../../../../public/icons/error.png'
function Error({error}:{error:Error}) {
  return (
    <div className="h-screen bg-grey-200 w-full flex flex-col justify-center items-center">
        <div>{error.message}</div>
        <Image width={300} src={ErrorImage} alt="" />
    </div>
  )
}

export default Error