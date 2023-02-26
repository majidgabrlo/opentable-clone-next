"use client"
import ReactLoading from 'react-loading'
function Loading() {
    return (
        <div className='h-24'>
            <ReactLoading className='mx-auto' type="spinningBubbles" color='navy' height={30} width={40} />
        </div>
    )
}

export default Loading