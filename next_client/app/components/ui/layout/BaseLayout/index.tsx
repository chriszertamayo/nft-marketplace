import React, { ReactNode } from "react"
import Navbar from "../../navbar"

const BaseLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="py-16 bg-gray-50 overfflow-hidden min-h-screen">
                <div className="max-w-7xl mx-auto px-4 space-y-8 smx:px-6 lg:px-8">{children}</div>
            </div>
        </div>
    )
}

export default BaseLayout
