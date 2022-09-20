import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Cross1Icon } from '@radix-ui/react-icons';

import './style.css';

const Modal = ({
  children,
  isOpen,
  onClose,
  title = 'Modal Title',
}: ModalProps) => {
  const portalNode = useRef<
    HTMLDivElement | HTMLElement | null
  >(null);

  useEffect(() => {
    const portalId = Date.now().toString();

    if (isOpen && portalNode.current) {
      portalNode.current.classList.add('modal-portal');
      portalNode.current.setAttribute('id', portalId);
      document.body.appendChild(portalNode.current);
    }

    const el = portalNode.current;

    return () => {
      if (el) {
        el.remove();
      }
    };
  }, [isOpen]);

  if (!portalNode.current) {
    portalNode.current = document.createElement('div');
  }

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" />
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">
            {typeof title === 'string' ? (
              <h4>{title}</h4>
            ) : (
              title
            )}
          </div>
          <div className="modal-close-btn">
            <button
              title={`Close ${title} Dialog`}
              onClick={onClose}
              className="btn"
            >
              <Cross1Icon />
            </button>
          </div>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </>,
    portalNode.current,
  );
};

export default Modal;
