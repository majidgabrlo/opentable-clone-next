import { ReactNode } from "react"
import Header from "./components/Header"

function layout({ children,params }: { children: ReactNode, params: { slug: string } }) {
    return (
        <main>
            <Header slug={params.slug} />
            <div className="md:flex m-auto md:w-2/3 justify-between items-start 0 md:-mt-11">
                {children}
            </div>
        </main>
    )
}

export default layout