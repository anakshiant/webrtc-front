import React from "react";
export default function Header(props) {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "solid 1px #c4c4c4",
        boxShadow: "0px 1px 12px #c4c4c4",
        position: "fixed",
        width: "100%",
        background: "#fff"
      }}
    >
      <img src={"/assets/logo.png"} style={{ width: "70px", height: "70px" }} />
      <h2 style={{ marginLeft: "10px" }}>DishErve</h2>
    </div>
  );
}
