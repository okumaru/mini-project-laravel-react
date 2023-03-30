import React, { useState, useEffect, useRef } from "react";

export default function TableProject({ dataSet }) {

  const [counter, setCounter] = useState(0);
  const dataFetchedRef = useRef(false);

  const renderedFirstly = () => {
    setCounter((oldValue) => oldValue+1);
  }

  const jqueryTable = () => {
    $('#table-project').DataTable({
      paging: false,
      searching: false,
      ordering: false,
      info: false,
      data: dataSet,
      columns: [
          { title: 'Name' },
          { title: 'Position' },
          { title: 'Office' },
          { title: 'Extn.' },
          { title: 'Start date' },
          { title: 'Salary' },
      ],
    });
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    
    dataFetchedRef.current = true;
    renderedFirstly();
    jqueryTable();
  },[])

  return <>
    <div className="">
      <table id="table-project"></table>
    </div>
  </>;
}
