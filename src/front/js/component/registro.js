import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const Registro = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { store, actions } = useContext(Context);

  const handleSubmit2 = (e) => {
    e.preventDefault();

    actions.registration(newEmail, newPassword);
  };
  return (
    <div id="register" className=" container  mb-3 text-center border">
      <div className="container">
        <form onSubmit={handleSubmit2}>
          <div className=" mt-3 input-group">
            <input
              placeholder="Email address"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
          <div className="input-group">
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" container mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label ms-2" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button className=" button btn  mt-4 mb-3">Registrar</button>
        </form>
        {/* )} */}
      </div>
    </div>
  );
};

export default Registro;
