# Modal. tsx Example

```tsx
import { createContext, use, type ReactNode } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from 'shadcn';
import { Button } from 'shadcn';
import { Input } from 'shadcn';

interface ModalState {
  open: boolean;
  value: string;
}

interface ModalActions {
  update: (updater: (current: ModalState) => ModalState) => void;
}

interface ModalContextValue {
  state: ModalState;
  actions: ModalActions;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// Helper hook to safely access context
const useModalContext = () => {
  const context = use(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within Modal.Provider');
  }
  return context;
};

interface ModalProps {
  children: ReactNode;
  state: ModalState;
  actions: ModalActions;
}

const Modal = ({ children, state, actions }: ModalProps) => {
  return (
    <ModalContext.Provider value={{ state, actions }}>
      <Dialog
        open={state.open}
        onOpenChange={(open) =>
          actions.update((current) => ({ ...current, open }))
        }
      >
        {children}
      </Dialog>
    </ModalContext.Provider>
  );
};

const Trigger = () => {
  const { actions } = useModalContext();

  return (
    <DialogTrigger asChild>
      <Button
        variant="outline"
        onClick={() =>
          actions.update((current) => ({ ...current, open: true }))
        }
      >
        Open Dialog
      </Button>
    </DialogTrigger>
  );
};

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <DialogContent>{children}</DialogContent>;
};

interface HeaderProps {
  title?: string;
  description?: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <DialogHeader>
      {title && <DialogTitle>{title}</DialogTitle>}
      {description && <DialogDescription>{description}</DialogDescription>}
    </DialogHeader>
  );
};

interface FooterProps {
  children: ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  return <DialogFooter>{children}</DialogFooter>;
};

const InputField = () => {
  const { state, actions } = useModalContext();
  return (
    <Input
      value={state.value}
      onChange={(e) =>
        actions.update((current) => ({ ...current, value: e.target.value }))
      }
    />
  );
};

const Submit = () => {
  const { actions } = useModalContext();
  return (
    <Button
      onClick={() => actions.update((current) => ({ ...current, open: false }))}
    >
      Submit
    </Button>
  );
};

Modal.Provider = Modal;
Modal.Trigger = Trigger;
Modal.Content = Content;
Modal.Header = Header;
Modal.Footer = Footer;
Modal.InputField = InputField;
Modal.Submit = Submit;

export default Modal;
```

## Using Modal.tsx with UserModal.tsx

```tsx
import { useState } from 'react';
import Modal from './Modal';

const UserModal = () => {
  const [user, setUser] = useState({ value: '', open: false });
  console.log(user);

  return (
    <Modal.Provider state={user} actions={{ update: setUser }}>
      <Modal.Trigger />
      <Modal.Content>
        <Modal.Header
          title={'Add user'}
          description={'In this modal you can add users'}
        />
        <Modal.InputField />
        <Modal.Footer>
          <Modal.Submit />
        </Modal.Footer>
      </Modal.Content>
    </Modal.Provider>
  );
};

export default UserModal;
```
