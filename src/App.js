import React, { useState, useEffect } from 'react';
import EditableTable from './components/EditableTable';
import PDFPreview from './components/PDFPreview';

function App() {
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem('productRows');
    return savedRows ? JSON.parse(savedRows) : [];
  });

  const [showPDFPreview, setShowPDFPreview] = useState(false);

  useEffect(() => {
    localStorage.setItem('productRows', JSON.stringify(rows));
  }, [rows]);

  const handleShowPDFPreview = () => {
    setShowPDFPreview(true);
  };

  const handleClosePDFPreview = () => {
    setShowPDFPreview(false);
  };

  return (
    <div className="App">
      <EditableTable rows={rows} setRows={setRows} />
      <button onClick={handleShowPDFPreview} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        PDF ნახვა
      </button>
      {showPDFPreview && <PDFPreview rows={rows} onClose={handleClosePDFPreview} />}
    </div>
  );
}

export default App;
