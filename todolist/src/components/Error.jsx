import React from "react";
import Error from "../assets/Error.gif"
const Loading = () => {
  return (
    <div>
      <h3>에러가 발생했습니다.</h3>
      <img src={Error} alt="에러" width="10%" />
    </div>
  );
};

export default Loading;
