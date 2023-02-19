import { Cuisine, Location, PRICE } from "@prisma/client"
import Link from "next/link"

type SearchSideBarPropsType = {
    locations: Location[]
    cusines: Cuisine[]
    searchParams: { location?: string, cusine?: string, price?: PRICE }
}
function SearchSideBar({ locations, cusines, searchParams }: SearchSideBarPropsType) {
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
                {cusines.map(cusine =>
                    <Link
                        href={{
                            pathname: '/search', query: {
                                ...searchParams,
                                cusine: cusine.name
                            }
                        }}
                        key={cusine.id}>
                        <p className="font-light text-reg">{cusine.name}</p>
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