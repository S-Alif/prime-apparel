import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const DialogBox = ({ trigger = null, bottomCloseButton = null, dialogTitle = "Put a title", className = "", children }) => {

    return (
        <Dialog>
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