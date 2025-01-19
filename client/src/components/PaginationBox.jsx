import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationBox = ({ totalPage, currentPage, onPageChange }) => {

    const getPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalPage; i++) {
            pages.push(i)
        }
        return pages
    }

    return (
        <section id="pagination">
            <Pagination>
                <PaginationContent>

                    <PaginationItem>
                        <PaginationPrevious 
                            onClick={() => {
                                if (currentPage > 1) {
                                    onPageChange(currentPage - 1)
                                }
                            }}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>

                    {/* page number */}
                    {
                        getPageNumbers().map((e) => 
                        
                            e == currentPage ? (
                                <PaginationItem key={e}>
                                    <PaginationLink isActive>
                                        {e}
                                    </PaginationLink>
                                </PaginationItem>
                            ) : 
                            (
                                <PaginationItem key={e}>
                                    <PaginationLink
                                        onClick={() => {
                                            onPageChange(e)
                                        }}
                                    >
                                        {e}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )
                            
                    }

                    {totalPage > 5 && <PaginationEllipsis />}



                    <PaginationItem>
                        <PaginationNext 
                            onClick={() => {
                                if (totalPage > currentPage) {
                                    onPageChange(currentPage + 1)
                                }
                            }}
                            disabled={currentPage === totalPage}
                        />
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
        </section>
    )
}

export default PaginationBox