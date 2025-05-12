"use client";
import React, { useState } from "react";

type Item = {
  name: string;
  price: number;
  color?: string;
};

const items: Item[] = [
  { name: "BURR", price: 245_000, color: "gray" },
  { name: "FINE BURR", price: 250_000, color: "red" },
  { name: "LUXURY", price: 60_000, color: "orange" },
  { name: "PROTPOT", price: 55_000, color: "green" },
  { name: "EMPTY BOTE", price: 10_000 },
  { name: "BATO BANDOL", price: 130_000 },
];

const ItemCalculator: React.FC = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (name: string, value: string) => {
    const quantity = parseInt(value) || 0;
    setQuantities((prev) => ({
      ...prev,
      [name]: quantity,
    }));
  };

  const handleClear = () => {
    setQuantities({});
  };

  const getItemTotal = (name: string, price: number): number => {
    const quantity = quantities[name] || 0;
    return quantity * price;
  };

  const grandTotal = items.reduce(
    (acc, item) => acc + getItemTotal(item.name, item.price),
    0
  );

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Item Price Calculator</h2>
      {items.map((item) => (
        <div key={item.name} style={{ marginBottom: 16 }}>
          <strong style={{ marginBottom: 16, color: item.color || "black" }}>
            {item.name}
          </strong>{" "}
          – ${item.price.toLocaleString()}
          <br />
          Quantity:{" "}
          <input
            type="number"
            min="0"
            value={quantities[item.name] || ""}
            onChange={(e) => handleQuantityChange(item.name, e.target.value)}
            style={{
              width: 80,
              border: "1px solid #ccc",
              borderRadius: 4,
              padding: "4px 6px",
            }}
          />
        </div>
      ))}
      <hr />
      <h1 className="text-2xl">Total: ${grandTotal.toLocaleString()}</h1>
      <button
        onClick={handleClear}
        style={{
          marginTop: 10,
          padding: "6px 12px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default ItemCalculator;
