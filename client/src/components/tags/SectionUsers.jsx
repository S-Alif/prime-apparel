import React from 'react'

const SectionUsers = ({
    sectionTtitle = "",
    sectionId = "" + Date.now(),
    sectionClassNames="",
    children
}) => {

    return (
        <section className={`w-full h-auto py-[50px] ${sectionClassNames}`} id={sectionId}>
            <div className="container">
                <div className="relative py-1 mb-[70px] after:absolute after:w-2 after:h-full after:bg-primary after:rounded-md after:top-0">
                    <h2 className="text-[31px] font-bold capitalize pl-5">{sectionTtitle}</h2>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default SectionUsers