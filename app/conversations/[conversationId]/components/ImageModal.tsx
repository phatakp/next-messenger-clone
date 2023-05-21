import { Modal } from "@/app/components/Modal";
import Image from "next/image";
import { FC } from "react";

interface IImageModalProps {
    src?: string | null;
    onClose: () => void;
    isOpen?: boolean;
}

export const ImageModal: FC<IImageModalProps> = ({ src, isOpen, onClose }) => {
    if (!src) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80">
                <Image alt="image" className="object-cover" fill src={src} />
            </div>
        </Modal>
    );
};
