import React, { useState } from "react";

function TransactionsList({ transactions }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = transactions.filter(t =>
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filtered.map((t) => (
        <div key={t.id}>
          <span>{t.description}</span> - <span>{t.amount}</span>
        </div>
      ))}
    </div>
  );
}

export default TransactionsList;
