// utils/alertUtils.ts
import Swal from "sweetalert2"; 

 
export const showCreateAlert = (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: `The ${message} was successfully added `,
    showConfirmButton: false,
    timer: 1500
  });
};
export const showEditeAlert = (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: `The ${message} was successfully Edited `,
    showConfirmButton: false,
    timer: 1500
  });
};
export const showDeleteAlert = (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Delete",
    text: `The ${message} was successfully deleted `,
    showConfirmButton: false,
    timer: 1500
    
  });
};

export const showErrorAlert = (message: string) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `Error when ${message}`,
    showConfirmButton: false,
    timer: 1500
  });
};

 

export const showWarningAlert = (message: string) => {
  return Swal.fire({
    icon: "warning",
    title: "Warning",
    text: message,
    showConfirmButton: false,
    timer: 1500
  });
};

export const confirmDeleteAlert = (object: string, name:string) => {
    return Swal.fire({
      title: `Delete ${object}?`,
      text: `You are about to remove ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(220, 53, 69)",
      cancelButtonColor: "rgb(52, 58, 64)",
      confirmButtonText: "Ok",
    });
  };