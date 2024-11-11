import React from 'react';

const EditableTable = ({ rows, setRows }) => {
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;

    if (name === 'price' || name === 'markup' || name === 'quantity' || name === 'sellPrice') {
      const price = parseFloat(updatedRows[index].price) || 0;
      const markup = parseFloat(updatedRows[index].markup) || 0;
      const sellPrice = parseFloat(updatedRows[index].sellPrice) || 0;
      const quantity = parseFloat(updatedRows[index].quantity) || 1;

      if (name === 'markup' || name === 'price') {
        updatedRows[index].sellPrice = (price * (1 + markup / 100)).toFixed(2);
      } else if (name === 'sellPrice') {
        updatedRows[index].markup = (((sellPrice / price) - 1) * 100).toFixed(2);
      }

      updatedRows[index].totalPrice = (updatedRows[index].sellPrice * quantity).toFixed(2);
    }
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { name: '', price: '', quantity: '', markup: '', sellPrice: 0, totalPrice: 0 }]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const totalBuyPrice = rows.reduce((sum, row) => sum + (parseFloat(row.price) * parseFloat(row.quantity) || 0), 0);
  const totalSellPrice = rows.reduce((sum, row) => sum + (parseFloat(row.totalPrice) || 0), 0);
  const totalDifference = totalSellPrice - totalBuyPrice;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">პროდუქციის მართვა</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">სახელი</th>
            <th className="border p-2">საყიდელი ფასი</th>
            <th className="border p-2">რაოდენობა</th>
            <th className="border p-2">% გასაყიდი</th>
            <th className="border p-2">გასაყიდი ფასი</th>
            <th className="border p-2">ჯამური ფასი</th>
            <th className="border p-2">ქმედება</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  type="text"
                  name="name"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  name="price"
                  value={row.price}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  name="quantity"
                  value={row.quantity}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  name="markup"
                  value={row.markup}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  name="sellPrice"
                  value={row.sellPrice}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full border p-1"
                />
              </td>
              <td className="border p-2 text-center">{row.totalPrice}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleDeleteRow(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  წაშლა
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <p>საყიდელი ფასების ჯამი: {totalBuyPrice.toFixed(2)}</p>
        <p>გასაყიდი ფასების ჯამი: {totalSellPrice.toFixed(2)}</p>
        <p>სხვაობა: {totalDifference.toFixed(2)}</p>
        <button onClick={handleAddRow} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          ახალი ველის დამატება
        </button>
      </div>
    </div>
  );
};

export default EditableTable;
