
function downloadInnerHtml(filename, elId, mimeType) {
  const elHtml = document.getElementById(elId).innerHTML;
  const link = document.createElement("a");
  mimeType = mimeType || "text/plain";

  link.setAttribute("download", filename);
  link.setAttribute(
    "href",
    "data:" + mimeType + ";charset=utf-8," + encodeURIComponent(elHtml)
  );
  link.click();
}

const fileName = "list.html"; // You can use the .txt extension if you want
downloadInnerHtml(fileName, "main", "text/html");
