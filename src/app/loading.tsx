"use client"
import ReactLoading from 'react-loading'
function Loading() {
    return (
        <div className='h-24'>
            <ReactLoading className='mx-auto' type="spin" color='navy' height={50} width={80} />
        </div>
    )
}

export default Loading