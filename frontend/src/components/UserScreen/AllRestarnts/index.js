import "./style.css";
import React, { useState, useEffect, useContext } from "react";
import { User } from "../../../controllers/user";
import NavBar from "../NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setrestaurantId } from "../../../redux/reducers/User";

const AllRestaurants = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState("");
  let [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageBtn, setPageBtn] = useState([]);
  const[currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    let responseRest = await User.getAllRestaurants();
    setRestaurants(responseRest.result);
    totalPages = Math.ceil(responseRest.result.length / 12);
    const arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }
    setTotalPages(totalPages);
    setPageBtn(arr);
  };
  const buildCategoryIcon = ({ url, text = "Pizza" }) => {
    return (
      <div
        key={text}
        id= "categoryIcon"
        onClick={() => {
         setCurrentCategory(text.toLocaleLowerCase())
        }}
      >
        <div className="DivimgCategory">
          <img className="imgCategory" src={url} />
        </div>

        <h3 className="h3h3NameCategory">{text}</h3>
      </div>
    );
  };

  const buildRestaurantCard = ({ element, index }) => {
    return (
      <div
        key={element.id}
        onClick={async () => {
          await localStorage.setItem("restaurantId", element.id);
          dispatch(setrestaurantId({ restId: element.id }));
          navigate("/RestaurantPage", {
            state: { id: localStorage.getItem("restaurantId") },
          });
        }}
        id="rest-card-div"
      >
        <img src={element.backImg} />
        <h3>{element.name}</h3>
      </div>
    );
  };
  const buildPageButton = (i) => {
    return (
      <div style={{ display: "flex" }} key={i + "k"}>
        <button
          onClick={() => {
            if (currentPage < i) {
              setCurrentPage(currentPage + 11);
            } else if (i < currentPage) {
              setCurrentPage(currentPage - 11);
            }
          }}
        >
          {i}
        </button>
        {i !== totalPages ? <div id="border"></div> : <></>}
      </div>
    );
  };
  const categories = [
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Zyu-T5WQ7bLxROPZPWo7u65WqNKpnk7NWQ&usqp=CAU",
      text: "Pizza",
    },
    {
      url: "https://media-cdn.tripadvisor.com/media/photo-s/17/57/7d/17/2-egg-breakfast.jpg",
      text: "Breakfast",
    },
    {
      url: "https://c8.alamy.com/comp/2F7BRP8/french-potato-pack-box-cartoon-fastfood-fry-potato-isolated-illustration-fast-food-2F7BRP8.jpg",
      text: "Fast food",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLKopRRHoSDAgqTfKGo8tn1y_iggg0CtY-YPVx-5V9elOO0080P-eAJi8zbqtpytywskg&usqp=CAU",
      text: "Burgess",
    },
    {
      url: "https://thumbs.dreamstime.com/b/vector-illustration-heart-shape-red-fruits-vegetables-healthy-nutrition-organic-concept-flat-style-127159995.jpg",
      text: "Healthy",
    },
    {
      url:"https://cdn.loveandlemons.com/wp-content/uploads/2021/06/summer-desserts.jpg",
      text:"Sweets"
    },
    {
      url:"https://images.deliveryhero.io/image/talabat/Menuitems/80850219637895358999912265.jpg",
      text:"Juices"
    },
  
  ];

  return (
    <div className="Al">
      <NavBar />
      <div className="first-restaurant-div">
        <div className="Continert1">
          <div className="Continer_A_A">
            {categories.map((category) => {
              return buildCategoryIcon({
                url: category.url,
                text: category.text,
              });
            })}
          </div>
          <div className="Continert">
            <div id="restaurants-div">
              {restaurants
                ? restaurants.map((element, index) => {
                    if (index >= currentPage - 1 && index < currentPage + 11 && element.rest_category.includes(currentCategory)) {
                      return buildRestaurantCard({ element, index });
                    }
                  })
                : " "}
            </div>
            {pageBtn.length > 1 ? (
              <div id="pagination-div">
                {pageBtn.map((i) => {
                  return buildPageButton(i);
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRestaurants;
