import { toast } from 'react-toastify';
import toastOptions from './ToastOptions';

export function toastFetchingError() {
  const errorMsg = 'Error Fetching Notes';
  toast.error(errorMsg, {
    ...toastOptions,
    toastId: errorMsg,
  });
}
export function toastCreatingError() {
  const errorMsg = 'Error Creating Note';
  toast.error(errorMsg, {
    ...toastOptions,
    toastId: errorMsg,
  });
}
export function toastUpdatingError() {
  const errorMsg = 'Error Updating Note';
  toast.error(errorMsg, {
    ...toastOptions,
    toastId: errorMsg,
  });
}
export function toastDeletingError() {
  const errorMsg = 'Error Deleting Note';
  toast.error(errorMsg, {
    ...toastOptions,
    toastId: errorMsg,
  });
}
