import React, { useEffect, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import Snackbar from "@mui/material/Snackbar";
import { SpinnerDotted } from "spinners-react";
import Alert from "@mui/material/Alert";
import { RiNumber1 } from "react-icons/ri";
import { RiNumber3 } from "react-icons/ri";
import { RiNumber2 } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

function pageThree() {
  const navigate = useNavigate()
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/products?page=3", {
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
        }, 3500);
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

  const handleColorChange = (el, ind) => {
    setActive(ind);
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
      color: selectedColor,
    };

    const existingItems = getData() || [];

    const itemExists = existingItems.some(
      (existingItem) => existingItem.card.id === Product.id
    );

    if (!itemExists) {
      setOpen(true);
      setCounter(counter + 1);
      existingItems.push(product);
      localStorage.setItem("products", JSON.stringify(existingItems));
      console.log("Item saved to localStorage successfully.");
    } else {
      setError(true);
      console.log("Item already exists in localStorage.");
    }
  };
  localStorage.setItem("count", JSON.stringify(counter))
  const [pageOne, setPageOne] = useState(false)
  const [pageTwo, setPageTwo] = useState(false)
  const [pageThree, setPageThree] = useState(true)

  function pageOneHandle() {
    setPageOne(true)
    setPageTwo(false)
    setPageThree(false)
    navigate('/')
  }
  function pageTwoHandle() {
    setPageOne(false)
    setPageTwo(true)
    setPageThree(false)
    navigate('/pageTwo')
  }
  function pageThreeHandle() {
    setPageOne(false)
    setPageTwo(false)
    setPageThree(true)
    navigate('/pageThree')
  }

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
                            onClick={() => handleColorChange(el, ind)}
                            className="color"
                            key={ind}
                            style={{
                              backgroundColor: el,
                              border:
                                ind == active ? "solid black" : "solid white",
                            }}
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

      <div className="page">
        <div className="page-1">
          <RiNumber1  onClick={pageOneHandle}
            style={{
              color: pageOne ? "white" : "black",
              background: pageOne ? "rgb(12, 5, 111)" : "white",
              padding: "10px",
              width: "40px",
              borderRadius: "50%",
              height: "40px",
              cursor: "pointer",
              transition: "all 0.5s ease-in-out",
            }}
          />
        </div>
        <div className="page-1">
          <RiNumber2 onClick={pageTwoHandle}
            style={{
              color: pageTwo ? "white" : "black",
              background: pageTwo ? "rgb(12, 5, 111)" : "white",
              padding: "10px",
              width: "40px",
              borderRadius: "50%",
              height: "40px",
              cursor: "pointer",
              cursor: "pointer",
              transition: "all 0.5s ease-in-out",
            }}
          />
        </div>
        <div className="page-1">
          <RiNumber3  onClick={pageThreeHandle}
            style={{
              color: pageThree ? "white" : "black",
              background: pageThree ? "rgb(12, 5, 111)" : "white",
              cursor: "pointer",
              padding: "10px",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              cursor: "pointer",
              transition: "all 0.5s ease-in-out",
            }}
          />
        </div>

      </div>

        <div className="count">{counter}</div>
        <h1 className="category-title">Products</h1>
        {loading ? (
          <SpinnerDotted
            className="loader"
            size={70}
            thickness={150}
            speed={150}
            color="#06d5cb"
          />
        ) : (
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
        )}
      </div>
    </>
  );
}

export default pageThree;
