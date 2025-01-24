import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"

const DialogBox = ({ 
    trigger = null,
    bottomCloseButton = null,
    dialogTitle = "Put a title",
    className = "",
    dialogId = "",
    openDialogId = null,
    setDialogId = () => {},
    children
}) => {
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        if (openDialogId !== dialogId) {
            return setOpen(false)
        }
        setOpen(true)
    }, [openDialogId])


    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            if(isOpen) return setDialogId(dialogId)
            setDialogId(null)
        }}>
            {
                trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>
            }
            <DialogContent className={`${className}`}>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                </DialogHeader>
                
                <div className="py-4">
                    {children}
                </div>

                {
                    bottomCloseButton &&
                    <DialogFooter>
                        {bottomCloseButton}
                    </DialogFooter>
                }
            </DialogContent>
            
        </Dialog>
    )
}

export default DialogBox