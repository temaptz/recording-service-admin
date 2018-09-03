import { ToastDefaults, SnotifyPosition } from 'ng-snotify';


export const SnotifyToastCustomConfig = {
  ...ToastDefaults, toast: {
    ...ToastDefaults.toast,
    timeout: 2000,
    showProgressBar: false,
    position: SnotifyPosition.rightTop,
  },
};
