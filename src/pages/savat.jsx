import React, { useEffect, useState } from "react";

function savat() {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(localStorage.getItem('count'));

  useEffect(() => {

    function getData() {
      try {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        return products;
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return [];
      }
    }
  
    const storedData = getData();
    console.log(storedData);
    setData(storedData);
  }, []);
  

  return (
    <>
      <div className="basket">
      <div className="count">{counter}</div>
        <h1>Savat</h1>
        <div className="basket-info-cards">
          {data.map((a, index) => (
            <div key={index} className="basket-card">
              <img src={a.card.attributes.image} alt="rasm" />
              <div className="basket-title">
                <h2>{a.card.attributes.title}</h2>
                <div className="color" style={{ backgroundColor: a.color }}>
                </div>
              </div>
              <div className="basket-brand">
                <span>{a.card.attributes.company}</span>
                <span>{a.card.attributes.category}</span>
              </div>
              <div className="basket-price">
                <span>{a.card.attributes.price}</span>
              </div>
                <button
                  className="basket-delete"
                  onClick={() => {
                    const updatedData = data.filter((x) => x.card.id !== a.card.id);
                    setData(updatedData);
                    localStorage.setItem("products", JSON.stringify(updatedData));
                    setCounter(counter - 1);
                  }}
                >
                  Delete
                </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default savat;
