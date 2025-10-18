import { useState } from "react";
import axios from "axios";

function AddItem() {
  const [formData, setFormData] = useState({ name: "", price: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/items", formData)
      .then(() => alert("Item added!"))
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItem;
