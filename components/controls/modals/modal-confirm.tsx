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
   

export interface ModalConfirmProps {
    showDialogNameButton: string | ReactNode,
    title: string,
    description: string,
    cancelButtonName: string,
    confirmButtonName: string,
    onClickCancel: () => any,
    onClickConfirm: () => any,
    classNameShowDialogButton?: string,
    classCancelDialogButton?: string,
    classConfirmDialogButton?: string
}

  export function ModalConfirm(props: ModalConfirmProps) {
    const {showDialogNameButton, title, description, cancelButtonName, confirmButtonName, onClickCancel, onClickConfirm, classCancelDialogButton, classNameShowDialogButton, classConfirmDialogButton} = props
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
            <AlertDialogCancel className={classCancelDialogButton} onClick={() => onClickCancel()}>{cancelButtonName}</AlertDialogCancel>
            <AlertDialogAction className={classConfirmDialogButton} onClick={() => onClickConfirm()}>{confirmButtonName}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }