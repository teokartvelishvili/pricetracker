import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

function PDFPreview({ rows, onClose }) {
  const pdfRef = useRef();
  const fileName = 'sales_report.pdf';

  const generatePDF = async (share = false) => {
    const element = pdfRef.current;
    const options = {
      margin: 0.5,
      filename: fileName,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    const pdfInstance = html2pdf().set(options).from(element);

    if (share && navigator.share) {
      // გენერაცია `output` მეთოდის გამოყენებით, რაც მონაცემებს ტექსტის ფორმატში მიიღებს
      const pdfBlob = await pdfInstance.output('blob');
      const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

      try {
        await navigator.share({
          files: [pdfFile],
          title: 'Sales Report',
          text: 'Please find the attached PDF report.',
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      pdfInstance.save();
    }
  };

  const totalSellPrice = rows.reduce((sum, row) => sum + (parseFloat(row.totalPrice) || 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="overflow-auto p-3 sm:p-4">
          <div ref={pdfRef} className="min-w-full">
            {/* <h2 className="text-lg font-bold mb-4">PDF-ის წინასწარი ნახვა</h2> */}
            <table className="w-full min-w-[560px] border border-gray-300 mb-4">
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
        </div>

        <div className="flex flex-wrap justify-end gap-2 sm:gap-3 border-t border-gray-200 bg-white p-3 sm:p-4">
          <button onClick={() => generatePDF(false)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full sm:w-auto">PDF შენახვა</button>
          <button onClick={() => generatePDF(true)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full sm:w-auto">PDF გაზიარება</button>
          <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full sm:w-auto">დახურვა</button>
        </div>
      </div>
    </div>
  );
}

export default PDFPreview;
