import jsPDF from "jspdf";
import "jspdf-autotable";

export const report = (columns, data) => {
  const doc = new jsPDF();
  doc.autoTable({
    head: [columns],
    body: [...data],
  });

  doc.save("table.pdf");
};
