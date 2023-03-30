import React from "react";

export default function ButtonPaginationLast({click}) {
  return <button className="border-0 bg-transparent" onClick={click} >
    <i className="fas fa-angle-right"></i>
    <i className="fas fa-angle-right"></i>
  </button>
}
