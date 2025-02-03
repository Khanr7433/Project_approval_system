import toast from "react-hot-toast";

export const handleError = (error) => {
  if (
    error.response &&
    error.response.headers["content-type"]?.includes("text/html")
  ) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(error.response.data, "text/html");
    let message = doc.body.textContent.trim();
    const fileIndex = message.toLowerCase().indexOf("at file:");
    if (fileIndex !== -1) {
      message = message.slice(0, fileIndex - 4).trim() + "...";
    } else {
      message = message.length > 100 ? message.slice(0, 100) + "..." : message;
    }
    toast.error(message);
    throw message;
  } else {
    toast.error(
      error.response?.data?.message || "An unexpected error occurred"
    );
    throw error;
  }
};
