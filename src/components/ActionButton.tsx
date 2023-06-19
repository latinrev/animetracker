"use client";

import { ReactElement, useTransition } from "react";
import { experimental_useFormStatus } from "react-dom";

interface ActionButton {
  buttonText: string | ReactElement;
  action?: (id?: any, data?: any) => Promise<void>;
  id?: string;
  className?: string;
  withConfirmation?: boolean;
  data?: any;
  isForm?: boolean;
  noAction?: boolean;
}
export default function ActionButton({
  buttonText,
  action,
  id,
  className,
  withConfirmation,
  data,
  isForm,
  noAction = false,
}: ActionButton) {
  const [isPending, startTransition] = useTransition();
  const executeAction = () => {
    const execute = withConfirmation ? confirm("Are you sure?") : true;
    startTransition(() => {
      if (execute && !noAction) {
        action(id, data);
      }
    });
  };

  return (
    <button
      type="submit"
      formAction={isForm ? executeAction : null}
      onClick={!noAction ? executeAction : null}
      className={className}
      disabled={isPending}>
      {buttonText}
    </button>
  );
}
