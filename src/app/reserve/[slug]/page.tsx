import Navbar from "@/app/components/Navbar"
import Form from "./components/Form"
import Header from "./components/Header"

function Reservation(): JSX.Element {
    return (
        <div className="border-t h-screen">
            <div className="py-9 w-3/5 m-auto">
                <Header />
                <Form />
            </div>
        </div>
    )
}

export default Reservation