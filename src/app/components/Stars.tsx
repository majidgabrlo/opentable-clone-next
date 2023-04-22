import emptyStar from '../../../public/icons/empty-star.png'
import halfStar from '../../../public/icons/half-star.png'
import fullStar from '../../../public/icons/full-star.png'
import { Review } from '@prisma/client'
import Image from 'next/image'

function Stars({ reviews,rating }: { reviews?: Review[], rating?: number }) {
    const stars = (reviews ? reviews.reduce((prev, review) => review.rating + prev, 0) / reviews.length : rating) || 0
    const renderStars = (rating: number) => {
        const stars = []
        for (let i = 0; i < 5; i++) {
            const diffrence = parseFloat((rating - i).toFixed(1))
            if (diffrence >= 1) stars.push(fullStar)
            else if (diffrence < 1 && diffrence > 0) {
                if (diffrence < .2) stars.push(emptyStar)
                else if (diffrence > .2 && diffrence < .8) stars.push(halfStar)
                else if (diffrence > .8) stars.push(fullStar)
            }
            else { stars.push(emptyStar) }
        }
        // using index as key because we don't have special key
        return stars.map((star,i) => <Image key={i} src={star} height={100} width={100} alt="" className='w-4 h-4 mr-1' />)
    }
    return <>{renderStars(stars)}</>
}

export default Stars