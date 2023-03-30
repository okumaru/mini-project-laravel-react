import React from "react";

export default function ButtonPaginationPrev({click}) {
  return <button className="border-0 bg-transparent" onClick={click}>
    <i className="fas fa-angle-left"></i>
  </button>
}
