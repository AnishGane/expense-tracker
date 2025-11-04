import moment from "moment";

export const generateTable = (doc, items, headers, type) => {
  const tableTop = doc.y;
  const startX = 50;
  const colWidths = [200, 150, 150];
  const rowHeight = 20;

  const drawHeader = () => {
    const headerY = doc.y;
    doc
      .rect(
        startX,
        headerY - 5,
        colWidths.reduce((a, b) => a + b, 0),
        rowHeight
      )
      .fill(type === "income" ? "#4caf50" : "#f44336");

    doc.fillColor("white").fontSize(12);
    doc.text(headers[0], startX + 5, headerY);
    doc.text(headers[1], startX + colWidths[0] + 5, headerY);
    doc.text(headers[2], startX + colWidths[0] + colWidths[1] + 5, headerY);

    doc.moveDown();
    doc.fillColor("black"); // reset color
    doc.y += rowHeight - 5;
  };

  drawHeader();

  items.forEach((item) => {
    try {
      const firstCol =
        type === "income" ? item.source || "—" : item.category || "—";
      const amountNum = Number(item.amount);
      const secondCol = !isNaN(amountNum)
        ? `$${amountNum.toLocaleString()}`
        : "$0";
      const thirdCol =
        item.date && moment(item.date).isValid()
          ? moment(item.date).format("MMM Do, YYYY")
          : "—";

      doc.fontSize(10);
      doc.text(firstCol, startX + 5, doc.y);
      doc.text(secondCol, startX + colWidths[0] + 5, doc.y);
      doc.text(thirdCol, startX + colWidths[0] + colWidths[1] + 5, doc.y);

      doc.y += rowHeight;

      // Page break
      if (doc.y > 750) {
        doc.addPage();
        drawHeader();
      }
    } catch (rowError) {
      console.error("Error rendering row:", rowError);
      doc.text("Error rendering row", startX + 5, doc.y);
      doc.y += rowHeight;
    }
  });

  doc
    .moveTo(startX, doc.y)
    .lineTo(startX + colWidths.reduce((a, b) => a + b, 0), doc.y)
    .stroke();
};
