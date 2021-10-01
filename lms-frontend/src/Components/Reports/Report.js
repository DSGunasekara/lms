import jsPDF from "jspdf";
import "jspdf-autotable";

export const report = (columns, data, title) => {
  const doc = new jsPDF();
  doc.text(`Institute of Science and Technology: ${title}`, 20, 10);
  doc.autoTable({
    head: [columns],
    body: [...data],
  });

  doc.save(`${title.toString().trim()}.pdf`);
};
