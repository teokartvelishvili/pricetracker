import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


function PDFPreview({ rows, onClose }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    // doc.addFileToVFS('DejaVuSans.ttf', font);
    doc.addFont('DejaVuSans.ttf', 'DejaVuSans', 'normal');
    doc.setFont('DejaVuSans');

    const tableColumn = ["პროდუქტი", "ერთეულის ფასი", "რაოდენობა", "ჯამური ფასი"];
    const tableRows = rows.map(row => [
      row.name,
      parseFloat(row.sellPrice).toFixed(2),
      row.quantity,
      parseFloat(row.totalPrice).toFixed(2),
    ]);

    const totalSellPrice = rows.reduce((sum, row) => sum + (parseFloat(row.totalPrice) || 0), 0);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      foot: [["სულ", "", "", totalSellPrice.toFixed(2)]],
    });

    doc.save('sales_report.pdf');
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded max-w-2xl w-full">
        <h2 className="text-lg font-bold mb-4">PDF-ის წინასწარი ნახვა</h2>
        <table className="min-w-full border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border p-2">პროდუქტი</th>
              <th className="border p-2">ერთეულის ფასი</th>
              <th className="border p-2">რაოდენობა</th>
              <th className="border p-2">ჯამური ფასი</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2 text-center">{row.name}</td>
                <td className="border p-2 text-center">{parseFloat(row.sellPrice).toFixed(2)}</td>
                <td className="border p-2 text-center">{row.quantity}</td>
                <td className="border p-2 text-center">{parseFloat(row.totalPrice).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="border p-2 text-right font-bold">სულ:</td>
              <td className="border p-2 text-center font-bold">
                {rows.reduce((sum, row) => sum + (parseFloat(row.totalPrice) || 0), 0).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
        <button onClick={generatePDF} className="bg-blue-500 text-white py-2 px-4 rounded">PDF გადაკეთება</button>
        <button onClick={onClose} className="mt-2 bg-red-500 text-white py-2 px-4 rounded">დახურვა</button>
      </div>
    </div>
  );
}

export default PDFPreview;
