export interface ToastMessage {
  id: number;
  kind: "success" | "error";
  message: string;
}

export interface ToastProps {
  notice: ToastMessage | null;
}
