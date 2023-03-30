import React from "react";

export default function ButtonPaginationFirst({click}) {
  return <button className="border-0 bg-transparent" onClick={click}>
    <i className="fas fa-angle-left"></i>
    <i className="fas fa-angle-left"></i>
  </button>
}
