

const CardLoader = () => {
    return (
        <div className="container">
            <div className='grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-10'>
                {
                    Array.from({length: 3}).map((_, index) => (
                        <div className="animate-pulse" key={index}>
                            <div className="w-full h-56 rounded-md bg-gray-400"></div>
                            <div className="flex-1 space-y-6 pt-5">
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2 h-2 rounded bg-gray-400"></div>
                                        <div class="col-span-1 h-2 rounded bg-gray-400"></div>
                                    </div>
                                    <div className="h-2 rounded bg-gray-400"></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CardLoader