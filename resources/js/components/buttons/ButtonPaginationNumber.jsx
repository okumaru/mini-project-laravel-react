import React from "react";

export default function ButtonPaginationNumber({pageNumber, isActive, click}) {
  return <button className={`border-0 bg-transparent ${isActive ? 'font-weight-bold page-link' : ''}`} onClick={click} >
    {pageNumber}
  </button>
}
