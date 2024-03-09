import React, { useEffect, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import Snackbar from "@mui/material/Snackbar";
import { SpinnerDotted } from "spinners-react";
import Alert from "@mui/material/Alert";

function home() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);

        setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 3500)

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const [single, setSingle] = useState([]);
  const [close, setClose] = useState(false);
  const detailPage = (Product) => {
    setSingle([{ ...Product }]);
    setClose(true);
  };
  console.log(single);

  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (el) => {
    setSelectedColor(el);
  };

  function getData() {
    let products = [];
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }
    return products;
  }

  const [counter, setCounter] = useState(0);
  const handleBasket = (Product) => {
    const product = {
      card: Product,
      count: counter + 1,
      color: selectedColor,
    };

    const existingItems = getData() || [];

    const itemExists = existingItems.some(
      (existingItem) => existingItem.card.id === Product.id
    );

    if (!itemExists) {
      setOpen(true)
      setCounter(counter + 1);
      existingItems.push(product);
      localStorage.setItem("products", JSON.stringify(existingItems));
      console.log("Item saved to localStorage successfully.");
    } else {
      setError(true)
      console.log("Item already exists in localStorage.");
    }
  };

  return (
    <>
      <div>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Saqlandi
          </Alert>
        </Snackbar>
      </div>

      <div>
        <Snackbar
          open={error}
          autoHideDuration={1000}
          onClose={handleCloseError}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            oldinham saqlangan
          </Alert>
        </Snackbar>
      </div>

      {close ? (
        <div className="single">
          <button className="single-btn" onClick={() => setClose(false)}>
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
          {single.map((x, ind) => {
            return (
              <>
                <h1>{x.attributes.title}</h1>
                <div className="single-cards">
                  <div className="single-img">
                    <img src={x.attributes.image} alt="" />
                  </div>
                  <div className="single-info">
                    <h3>{x.attributes.company}</h3>
                    <span>{x.attributes.price} $ </span>
                    <p>{x.attributes.description}</p>
                    <h3>Colors</h3>
                    <div className="single-colors">
                      {x.attributes.colors.map((el, ind) => {
                        return (
                          <div
                            onClick={() => handleColorChange(el)}
                            className="color"
                            key={ind}
                            style={{ backgroundColor: el }}
                          ></div>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => handleBasket(x)}
                      className="addBasket"
                    >
                      Add Basket <MdShoppingBasket className="addBasket-icon" />{" "}
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : null}
        <div className="categories">
        <div className="count">{counter}</div>
        <h1 className="category-title">Products</h1>
          { loading ? <SpinnerDotted className="loader" size={70} thickness={150} speed={150} color="#06d5cb" /> : 
            <div className="categories-cards">
            {product.map((el, ind) => {
              return (
                <div
                  key={ind}
                  className="categories-card"
                  onClick={() => detailPage(el)}
                >
                  <img src={el.attributes.image} alt="" />
                  <h3>{el.attributes.title}</h3>
                  <span>{el.attributes.price}$</span>
                </div>
              );
            })}
          </div>
          }

      </div>
    </>
  );
}

export default home;
