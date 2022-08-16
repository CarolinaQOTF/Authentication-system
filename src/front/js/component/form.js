import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RegistroView from "../pages/registroView";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.login(email, password);
  };

  return (
    <div>
      <div id="register" className="container  mb-3 text-center border">
        {store.auth === true ? (
          <Navigate to="/demo" />
        ) : (
          <div className=" container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 content-center mt-4">
                <input
                  placeholder="Email address"
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text mt-2">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <input
                  placeholder="Password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className=" container mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="exampleCheck1"
                >
                  Check me out
                </label>
              </div>
              <button className=" button btn  mt-3 mb-3">Submit</button>
            </form>
          </div>
        )}
      </div>

      <div className="mt-4">
        Si aun no estas registrado, haz
        <Link to={"/registroView"}>
          <u className="link ms-2">Click aquí</u>
        </Link>
      </div>
    </div>
  );
};

export default Form;
