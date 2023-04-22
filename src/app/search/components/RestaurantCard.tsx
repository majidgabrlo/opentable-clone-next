/* eslint-disable @next/next/no-img-element */
import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";
import { Cuisine, PRICE, Location, Review } from "@prisma/client";
import Link from "next/link"

type RestaurantCardPropsType = {
    id: number;
    name: string;
    main_image: string;
    cuisine: Cuisine;
    location: Location;
    price: PRICE;
    slug: string;
    reviews: Review[]
}

function showScore(score: number) {
    if (score >= 4) return "Awesome"
    if (score >= 3) return "Good"
    if (score >= 2) return "Not Recommend"
    if (score > 0) return "Trash"
    return "No rating"
}

function RestaurantCard({ restaurant }: { restaurant: RestaurantCardPropsType }) {
    const restaurantRating = restaurant.reviews.reduce((prev, review) => review.rating + prev, 0) / restaurant.reviews.length
    
    return (
        <div className="border-b flex pb-5">

            <div className="flex">
                <img
                    src={restaurant.main_image}
                    alt=""
                    className="w-44 h-36 rounded"
                />
                <div className="pl-5">
                    <h2 className="text-3xl">{restaurant.name}</h2>
                    <div className="flex items-start">
                        <div className="flex mb-2"><Stars reviews={restaurant.reviews} /></div>
                        <p className="ml-2 text-sm">{showScore(restaurantRating)}</p>
                    </div>
                    <div className="mb-9">
                        <div className="font-light flex text-reg">
                            <Price price={restaurant.price} />
                            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
                            <p className="mr-4 capitalize">{restaurant.location.name}</p>
                        </div>
                    </div>
                    <div className="text-red-600">
                        <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RestaurantCard