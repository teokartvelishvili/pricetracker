import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

function PDFPreview({ rows, onClose }) {
  const pdfRef = useRef();

  const generatePDF = () => {
    const element = pdfRef.current;
    const options = {
      margin: 0.5,
      filename: 'sales_report.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  const totalSellPrice = rows.reduce((sum, row) => sum + (parseFloat(row.totalPrice) || 0), 0);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded max-w-2xl w-full">
        <div ref={pdfRef}>
          {/* <h2 className="text-lg font-bold mb-4">PDF-ის წინასწარი ნახვა</h2> */}
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
                <td className="border p-2 text-center font-bold">{totalSellPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={generatePDF} className="bg-blue-500 text-white py-2 px-4 rounded">PDF გადაკეთება</button>
          <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded">დახურვა</button>
        </div>
      </div>
    </div>
  );
}

export default PDFPreview;
