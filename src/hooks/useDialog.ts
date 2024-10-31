// src/hooks/useDialog.ts
import { useState } from 'react';

const useDialog = () => {
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const [openDialogMovement, setOpenDialogMovement] = useState<boolean>(false);

  const openFormDialog = () => setOpenDialogForm(true);
  const closeFormDialog = () => setOpenDialogForm(false);

  const openMovementDialog = () => setOpenDialogMovement(true);
  const closeMovementDialog = () => setOpenDialogMovement(false);

  return {
    openDialogForm,
    openDialogMovement,
    openFormDialog,
    closeFormDialog,
    openMovementDialog,
    closeMovementDialog,
  };
};

export default useDialog;
