import { Review } from "@prisma/client"
import ReviewCard from "./ReviewCard"

function Reviews({ reviews }: { reviews: Review[] }) {
    return (
        <div>
            {reviews.length ?
                <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                    What {reviews.length} {reviews.length > 1 ? 'people are' : "person is"} saying
                </h1> :
                <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                    Be the first person that comments about this restaurant
                </h1>}
            <div>
                {reviews.map(review =>
                    <ReviewCard key={review.id} review={review} />
                )}
            </div>
        </div>
    )
}

export default Reviews