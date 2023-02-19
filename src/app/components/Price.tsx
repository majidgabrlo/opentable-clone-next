import { PRICE } from "@prisma/client"

function Price({ price }: { price: PRICE }) {
    const renderPrice = (price: PRICE) => {
        if (price === "CHEAP") return <><span>$$</span><span className="text-slate-300">$$</span></>
        if (price === "REGULAR") return <><span>$$$</span><span className="text-slate-300">$</span></>
        if (price === "EXPENSIVE") return <span>$$$$</span>
        return null
    }
    return <p className="pr-3">{renderPrice(price)}</p>
}

export default Price