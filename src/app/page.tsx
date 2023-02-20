import RestaurantCard from './components/RestaurantCard'
import Header from './components/Header'
import { Cuisine, Location, PRICE, PrismaClient, Review } from '@prisma/client'

const prisma = new PrismaClient()

export type RestaurantCardType = {
  id: number
  name: string
  main_image:string
  slug:string
  cuisine:Cuisine
  location:Location
  price:PRICE
  reviews:Review[]
}

const fetchRestaurants = async ():Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine:true,
      location: true,
      price: true,
      slug:true,
      reviews:true
    }
  })
  return restaurants
}

export default async function Home() {
  const restaurants = await fetchRestaurants()
  
  return (
    <>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map(restaurant=><RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
        
      </div>
    </>

  )
}
