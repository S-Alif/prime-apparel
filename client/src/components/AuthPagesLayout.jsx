import React from 'react'
const AuthPagesLayout = ({ 
    pageImage,
    id = "page-id",
    pageTitle = "Page title",
    belowTitleText = "",
    children
}) => {

    const defaultPageImage = "https://images.pexels.com/photos/30194213/pexels-photo-30194213/free-photo-of-stylish-man-posing-in-white-outfit-against-gradient-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

    return (
        <section className="w-full relative h-[calc(100vh-90px)] lg:flex lg:justify-between" id={id}>
            <div className="w-full h-full lg:w-1/2 absolute -z-10 lg:static lg:z-0">
                <img className="w-full h-full object-cover object-center" src={pageImage || defaultPageImage} alt="Background" />
            </div>

            {/* form side */}
            <div className="lg:w-1/2 lg:block h-full flex items-center">
                <div className="max-w-[calc(100%-20px)] w-[500px] mx-auto lg:mx-0 my-5 lg:my-0 lg:w-full lg:px-[57px] xl:px-[77px] py-[20px] sm:py-[57px] bg-white px-5 sm:px-8 rounded-md">
                    <h1 className="text-3xl font-bold pb-4">{pageTitle}</h1>
                    {belowTitleText != "" && <p className='pb-3 text-xl'>{belowTitleText}</p>}
                    <hr className='mb-10' />

                    {children}
                </div>
            </div>
        </section>
    )
}

export default AuthPagesLayout