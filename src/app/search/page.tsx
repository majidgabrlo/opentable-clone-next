import { PRICE, PrismaClient } from "@prisma/client"
import RestaurantCard from "./components/RestaurantCard"
import Header from "./components/Header"
import SearchSideBar from "./components/SearchSideBar"


type SearchParams = { location?: string, cusine?: string, price?: PRICE }

const prisma = new PrismaClient()

const fetchRestaurantByLocation = async (searchParams: SearchParams) => {
    const where: any = {}

    if (searchParams.price) {
        const price = {
            equals: searchParams.price
        }
        where.price = price
    }
    if (searchParams.cusine) {
        const cuisine = {
            name: {
                equals: searchParams.cusine.toLowerCase()
            }
        }
        where.cuisine = cuisine
    }
    if (searchParams.location) {
        const location = {
            name: {
                equals: searchParams.location.toLowerCase()
            }
        }
        where.location = location
    }

    console.log(where);
    

    const select = {
        id: true,
        name: true,
        main_image: true,
        price: true,
        cuisine: true,
        location: true,
        slug: true
    }

    return await prisma.restaurant.findMany({
        where, select
    })
}

const fetchLocations = async () => {
    const locations = await prisma.location.findMany()
    return locations
}

const fetchCusines = async () => {
    const locations = await prisma.cuisine.findMany()
    return locations
}

async function Search({ searchParams }: { searchParams: SearchParams }) {
    const restaurants = await fetchRestaurantByLocation(searchParams)
    const locations = await fetchLocations()
    const cusines = await fetchCusines()

    return (
        <>
            <Header />
            <div className="flex gap-x-4 py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar locations={locations} cusines={cusines} searchParams={searchParams} />
                <div className="w-5/6">
                    {restaurants.length ? restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant.id} />) : <p>We couldn't find any restaurant around here</p>}

                </div>
            </div>
        </>

    )
}

export default Search