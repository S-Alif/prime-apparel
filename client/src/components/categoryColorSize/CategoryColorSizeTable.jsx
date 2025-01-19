import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CategoryColorSizeDialog from "./CategoryColorSizeDialog"
import { Button } from "../ui/button"
import { Edit3, X } from "react-feather"
import CategoryColorSizeForm from "./CategoryColorSizeForm"
import { adminRoutes, deleteMethod } from "@/constants/apiConstants"
import apiHandler from "@/api/apiHandler"
import { successToast } from "@/helpers/toasts"
import { useState } from "react"
import { DialogClose } from "../ui/dialog"
import productSpecStore from "@/stores/productSpecStore"


const CategoryColorSizeTable = ({ data = [], page = "category" }) => {

    const { removeCategories, removeColors, removeSizes } = productSpecStore()

    let deleteUrl = adminRoutes.category
    if (page == "color") deleteUrl = adminRoutes.colors
    if (page == "sizes") deleteUrl = adminRoutes.sizes

    const removeData = async (id) => {
        let result = await apiHandler(`${deleteUrl}/${id}`, deleteMethod)
        if(!result) return
        successToast(`${page} removed`)

        if(page == "category") removeCategories(id)
        if(page == "color") removeColors(id)
        if(page == "sizes") removeSizes(id)
        
    }
    
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
                                <TableCell className="pl-5 flex gap-3">
                                    <CategoryColorSizeDialog 
                                        trigger={<Button size="icon" className="!bg-green-500"><Edit3 /></Button>}
                                        title={`Update ${page}`}
                                    >
                                        <CategoryColorSizeForm 
                                            generateForm={page}
                                            data={e}
                                            updating={true}
                                        />
                                    </CategoryColorSizeDialog>

                                    <CategoryColorSizeDialog 
                                        trigger={<Button size="icon" variant="destructive"><X /></Button>}
                                        title={`Remove ${page}`}
                                        closeButtonOnFooter={
                                            <DialogClose asChild>
                                                <Button variant="destructive" onClick={() => removeData(e?._id)}>Proceed</Button>
                                            </DialogClose>
                                        }
                                    >
                                        <p className="pb-10">Are you sure you want to remove this {page} ?</p>
                                        
                                        
                                    </CategoryColorSizeDialog>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CategoryColorSizeTable