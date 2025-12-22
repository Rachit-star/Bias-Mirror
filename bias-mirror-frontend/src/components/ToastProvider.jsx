import React from "react";
import { ToastContainer } from "react-toastify";
//this is the notify container that will show toast notifications
//positioned at top-right of the screen
export default function ToastProvider() {
  return <ToastContainer position="top-right" />;
}
