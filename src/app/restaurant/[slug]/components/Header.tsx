function Header({ slug }: { slug: string }) {

    const renderTitle = (slug: string) => {
        const splitedSlug = slug.split("-")
        splitedSlug[splitedSlug.length - 1] = `(${splitedSlug[splitedSlug.length - 1]})`
        return splitedSlug.join(" ")
    }

    return (
        <div className="h-96 overflow-hidden">
            <div
                className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center"
            >
                <h1 className="text-7xl text-white capitalize text-shadow text-center">
                    {renderTitle(slug)}
                </h1>
            </div>
        </div>
    )
}

export default Header