import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { ReactNode } from "react"
   
  export interface ModalInfoProps {
    showDialogNameButton: string | ReactNode,
    title: string | ReactNode,
    description: string | ReactNode,
    confirmButtonName: string,
    onClickConfirm: () => any,
    classNameShowDialogButton?: string,
    classConfirmDialogButton?: string
}


  export function ModalInfo(props: ModalInfoProps) {
    const {showDialogNameButton, title, description, confirmButtonName, onClickConfirm, classNameShowDialogButton, classConfirmDialogButton} = props
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className={classNameShowDialogButton} variant="outline">{showDialogNameButton}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
            {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className={classConfirmDialogButton} onClick={() => onClickConfirm()}>{confirmButtonName}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }