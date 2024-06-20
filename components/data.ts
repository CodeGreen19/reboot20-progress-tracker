import toast from "react-hot-toast";
type ToastType = {
  text: string;
  type: "error" | "success";
};
let theme = {
  style: {
    backgroundColor: "black",
    color: "snow",
  },
};
export const showToast = ({ type, text }: ToastType) => {
  if (type === "error") {
    toast.error(text, theme);
  }
  if (type === "success") {
    toast.success(text, theme);
  }
};

export const clientSideErrorShow = (error: any) => {
  if (typeof error === "string") {
    return showToast({ type: "error", text: error });
  } else if (Array.isArray(error)) {
    return showToast({ type: "error", text: error[0].message });
  }
  return;
};
export const clientSideMessageShow = (message: string) => {
  if (message) {
    showToast({ type: "success", text: message });
  }
  return;
};
