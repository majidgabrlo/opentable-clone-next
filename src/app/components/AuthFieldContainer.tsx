import React from "react"

type AuthFieldContainerProps = { children: React.ReactNode, headerTitle: string, headerDescription: string }

function AuthFieldContainer({ children, headerTitle, headerDescription }: AuthFieldContainerProps) {
    return (
        <>
            <div className="p-2">
                <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                    <p className="text-sm">
                        {headerTitle}
                    </p>
                </div>
                <div className="h2 text-2xl font-light text-center">
                    {headerDescription}
                </div>
                <div className="m-auto">
                    {children}
                </div>
            </div>
        </>
    )
}

export default AuthFieldContainer