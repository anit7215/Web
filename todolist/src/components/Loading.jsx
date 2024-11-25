import React from "react";
import Spinner from "../assets/Spinner.gif"
const Loading = () => {
  return (
    <div>
      <h3>게시글을 불러오는 중입니다.</h3>
      <img src={Spinner} alt="로딩" width="10%" />
    </div>
  );
};

export default Loading;
