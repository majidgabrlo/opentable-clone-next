import Stars from "@/app/components/Stars"
import { Review } from "@prisma/client"

function Rating({ reviews }: { reviews: Review[] }) {
    const rating = reviews.reduce((prev, review) => review.rating + prev, 0) / reviews.length
    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <Stars reviews={reviews} />
                <p className="text-reg ml-3">{rating.toFixed(1)}</p>
            </div>
            <div>
                <p className="text-reg ml-4">{reviews.length} Review{reviews.length > 1 ? "s" : ""}</p>
            </div>
        </div>
    )
}

export default Rating