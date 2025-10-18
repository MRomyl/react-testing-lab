import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/items").then((res) => setItems(res.data));
  }, []);

  const updateItem = (id, newName) => {
    axios.patch(`http://localhost:4000/items/${id}`, { name: newName })
      .then(() => alert("Updated!"))
      .catch(console.error);
  };

  return (
    <div>
      <h1>Admin Edit Page</h1>
      {items.map((item) => (
        <div key={item.id}>
          <input
            type="text"
            defaultValue={item.name}
            onBlur={(e) => updateItem(item.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

export default Admin;
