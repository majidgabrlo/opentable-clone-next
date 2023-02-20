import { Cuisine, Location, PRICE } from "@prisma/client"
import Link from "next/link"

type SearchSideBarPropsType = {
    locations: Location[]
    cuisines: Cuisine[]
    searchParams: { location?: string, cuisine?: string, price?: PRICE }
}
function SearchSideBar({ locations, cuisines, searchParams }: SearchSideBarPropsType) {
    const prices = [
        { className: "border w-full text-reg font-light rounded-l p-2", label: '$', price: PRICE.CHEAP },
        { className: "border w-full text-reg font-light p-2", label: '$$', price: PRICE.REGULAR },
        { className: "border w-full text-reg font-light rounded-r p-2", label: '$$$', price: PRICE.EXPENSIVE }]
    return (
        <div className="w-1/5">
            <div className="border-b pb-4 capitalize">
                <h1 className="mb-2">Region</h1>
                {locations.map(location =>
                    <Link
                        href={{
                            pathname: '/search', query: {
                                ...searchParams,
                                location: location.name
                            }
                        }}
                        key={location.id}>
                        <p className="font-light text-reg">{location.name}</p>
                    </Link>
                )}
            </div>
            <div className="border-b pb-4 mt-3 capitalize">
                <h1 className="mb-2">Cuisine</h1>
                {cuisines.map(cuisine =>
                    <Link
                        href={{
                            pathname: '/search', query: {
                                ...searchParams,
                                cuisine: cuisine.name
                            }
                        }}
                        key={cuisine.id}>
                        <p className="font-light text-reg">{cuisine.name}</p>
                    </Link>
                )}
            </div>
            <div className="mt-3 pb-4">
                <h1 className="mb-2">Price</h1>
                <div className="flex text-center">
                    {prices.map(price =>
                        <Link href={{
                            pathname: '/search', query: {
                                ...searchParams,
                                price: price.price
                            }
                        }} className={price.className}>
                            {price.label}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchSideBar