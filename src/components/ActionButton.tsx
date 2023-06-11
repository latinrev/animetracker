"use client";

import { ReactElement, useTransition } from "react";

interface ActionButton {
  buttonText: string | ReactElement;
  action: (id?: any, data?: any) => Promise<void>;
  id?: string;
  className?: string;
  withConfirmation?: boolean;
  data?: any;
}
export default function ActionButton({ buttonText, action, id, className, withConfirmation, data }: ActionButton) {
  const [isPending, startTransition] = useTransition();

  const executeAction = () => {
    const execute = withConfirmation ? confirm("Are you sure?") : true;
    startTransition(() => {
      if (execute) {
        action(id, data);
      }
    });
  };

  return (
    <button type="submit" onClick={executeAction} className={className}>
      {buttonText}
    </button>
  );
}
