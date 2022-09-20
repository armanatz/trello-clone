interface ModalProps extends React.PropsWithChildren {
  title?: string | React.ReactElement | React.ReactElement[];
  isOpen?: boolean;
  onClose?: () => void;
}

interface ModalStateProps {
  isOpen: boolean;
  data: any;
}
