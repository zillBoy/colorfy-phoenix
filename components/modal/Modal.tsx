// React Dependencies
import React, { ReactNode } from "react";

// External Dependencies
import {
  Modal as NModal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
} from "@nextui-org/react";

// Internal Dependencies
import { ModalSizeProp } from "@/types";

export type ModalProps = {
  title: string;
  actionBtnText: string;
  isOpen: boolean;
  bodyContent: ReactNode;
  size?: ModalSizeProp;
  onOpenChange: () => void;
  onAction: () => void;
};

export const Modal = ({
  title,
  actionBtnText,
  isOpen,
  bodyContent,
  size = "md",
  onOpenChange,
  onAction,
}: ModalProps) => {
  const onActionHandler = async (onClose: () => void) => {
    try {
      await onAction();
      onClose();
    } catch (err) {
      console.log("Error in onActionHandler: ", err);
    }
  };

  return (
    <>
      <NModal size={size} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: any) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{bodyContent}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => onActionHandler(onClose)}
                >
                  {actionBtnText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </NModal>
    </>
  );
};
