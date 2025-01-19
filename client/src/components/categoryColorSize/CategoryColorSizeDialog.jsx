import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogFooter } from "../ui/dialog"
import { useState } from "react"


const DialogBox = ({
    trigger = null,
    title = "Dialog title",
    closeButtonOnFooter = null,
    boxOpen = false,
    children
}) => {
    const [open, setOpen] = useState(boxOpen)


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {
                trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>
            }
            <DialogContent className={`max-w-[calc(100%-12px)] md:w-[400px] lg:w-[500px] z-[1002]`}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    {children}
                </div>
                {
                    closeButtonOnFooter &&
                    <DialogFooter>
                        {closeButtonOnFooter}
                    </DialogFooter>
                }
            </DialogContent>
        </Dialog>
    )
}

export default DialogBox