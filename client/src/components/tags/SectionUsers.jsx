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
                <h2 className="text-[31px] font-bold pb-[70px] capitalize border-l-4 border-primary">{sectionTtitle}</h2>
                <div className="content">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default SectionUsers