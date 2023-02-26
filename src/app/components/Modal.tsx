import ReactDOM from 'react-dom';
import { ReactNode, useEffect } from 'react';

type ModalProps = {
    onClose: () => void
    children: ReactNode
}

function Modal({ onClose, children }: ModalProps) {
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return ReactDOM.createPortal(
        <div>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-gray-300 opacity-80 !blur-sm"
            ></div>
            <div className="fixed rounded inset-y-24 p-10 bg-white max-w-[400px] left-1/2 -translate-x-1/2">
                <div className="flex flex-col justify-between h-full overflow-auto">
                    {children}
                </div>
            </div>
        </div>,
        document.querySelector('.modal-container')!
    );
}

export default Modal;