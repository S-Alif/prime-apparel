import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const CategoryColorSizeTable = ({ data = [], page = "category" }) => {

    console.log(data)
    return (
        <div id={`${page}-table`}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold text-xl">#</TableHead>
                        <TableHead className={`font-bold text-xl pl-5 ${page == "color" ? "w-[33%]" : "w-[80%]"}`}>Name</TableHead>
                        {page == "color" && <TableHead className="font-bold text-xl">Color Value</TableHead>}
                        <TableHead className="font-bold text-xl pl-5">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.map((e,index) => (
                            <TableRow key={index} className="h-12">
                                <TableCell className="text-xl font-bold border-r">{index+1}</TableCell>
                                <TableCell className="text-xl pl-5 border-r">{e.name}</TableCell>
                                {page == "color" && <TableCell className="border-r">{e?.colorValue}</TableCell>}
                                <TableCell className="pl-5">Credit Card</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CategoryColorSizeTable