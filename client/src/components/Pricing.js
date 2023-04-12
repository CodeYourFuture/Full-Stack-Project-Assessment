import React from "react";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Img1 from "./images/bestmovies.jpg";
import Img2 from "./images/images2.jpeg";
import Img3 from "./images/movieposter.jpg";

const Pricing = () => {
  return (
    <>
      <Header />
      <form
        className="formInput"
        style={{ margin: "40px auto", width: "300px" }}
      >
        <div class="md-3">
          <h4 className="h-4">Subscribe for Discount</h4>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email Address"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="password"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <CardGroup className="group">
        <card className="cardGroup">
          <img src={Img1} alt="pricing1" />
          <div className="body-c1">
            <Button>£32 , Buy Now</Button>
          </div>
        </card>
        <card className="cardGroup">
          <img src={Img3} alt="pricing2" />
          <div className="body-c1">
            <Button>£32 , Buy Now</Button>
          </div>
        </card>{" "}
        <card className="cardGroup">
          <img src={Img2} alt="pricing3" />
          <div className="body-c1">
            <Button>£32 , Buy Now</Button>
          </div>
        </card>{" "}
        <card className="cardGroup">
          <img src={Img3} alt="pricing4" />
          <div className="body-c1">
            <Button>£32 , Buy Now</Button>
          </div>
        </card>{" "}
        <card className="cardGroup">
          <img src={Img1} alt="pricing5" />
          <div className="body-c1">
            <Button>£32 , Buy Now</Button>
          </div>
        </card>{" "}
        <card className="cardGroup">
          <img src={Img2} alt="pricing6" />
          <div className="body-c1">
            <Button>£32 , Buy Now</Button>
          </div>
        </card>
      </CardGroup>
      <Footer />
    </>
  );
};

export default Pricing;
