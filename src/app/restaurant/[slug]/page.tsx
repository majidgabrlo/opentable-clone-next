import { PrismaClient, Review } from "@prisma/client"
import Description from "./components/Description"
import Header from "./components/Header"
import Images from "./components/Images"
import Rating from "./components/Rating"
import ReservationCard from "./components/ReservationCard"
import RestaurantNavbar from "./components/RestaurantNavbar"
import Reviews from "./components/Reviews"
import Title from "./components/Title"

const prisma = new PrismaClient()

export type RestaurantType = {
    id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
    reviews: Review[];
    open_time: string
    close_time: string
}

const fetchRestaurantBySlug = async (slug: string): Promise<RestaurantType> => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            reviews: true,
            close_time: true,
            open_time: true
        }
    })
    if (!restaurant) {
        throw new Error("Restaurant not found")
    }
    return restaurant
}

async function RestaurantDetail({ params }: { params: { slug: string } }) {
    const restaurant = await fetchRestaurantBySlug(params.slug)

    return (
        <>
            <div className="bg-white md:w-[70%] rounded p-3 shadow">
                <RestaurantNavbar slug={restaurant.slug} />
                <Title name={restaurant.name} />
                <Rating reviews={restaurant.reviews} />
                <Description description={restaurant.description} />
                <Images images={restaurant.images} />
                <Reviews reviews={restaurant.reviews} slug={params.slug} />
            </div>
            <div className="w-[27%] relative text-reg">
                <ReservationCard openTime={restaurant.open_time} closeTime={restaurant.close_time} slug={params.slug} />
            </div>
        </>
    )
}

export default RestaurantDetail