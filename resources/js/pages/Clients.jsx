import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import FilterProject from "../components/FilterProject";
import FilterClient from "../components/FilterClient";
import { 
  ButtonPaginationFirst, 
  ButtonPaginationPrev, 
  ButtonPaginationNext, 
  ButtonPaginationLast,
  ButtonPaginationNumber
} from "../components/buttons/Buttons";
import { 
  ModalCreateClient,
  ModalUpdateClient,
} from "../components/modals/Modals"

const jqueryTable = () => {
  $('#list-client').DataTable({
    paging: false,
    searching: false,
    ordering: false,
    info: false,
  });

  $('#list-client > tbody > tr.odd').remove();
}

export default function Client() {

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [searchParams, setSearchParams] = useState({client_name: '', client_address: ''});

  const [counter, setCounter] = useState(0);
  const dataFetchedRef = useRef(false);
  const renderedFirstly = () => {
    setCounter((oldValue) => oldValue+1);
  }

  const ButtonPagination = () => {
    const buttonPages = [...Array(lastPage).keys()];
    return buttonPages.map((pageNumber, index) => {

      pageNumber += 1;
      if (pageNumber > page + 1 || pageNumber < page - 1) return

      return <ButtonPaginationNumber 
        key={index}
        click={() => fetchClients(pageNumber, searchParams)} 
        pageNumber={pageNumber} 
        isActive={page === pageNumber}
      />
    })
  }

  const TableItem = () => {
    return tableData.map( (data, index) => {
      return <tr key={index}>
        <td> 
          <ModalUpdateClient
            data={data} 
            finished={() => { fetchClients(1, searchParams) }}
          /> 
        </td>
        <td> { data.client_name } </td>
        <td> { data.client_address } </td>
      </tr>
    })
  }

  const fetchClients = async (page = 1, params) => {
    console.log(params);
    const req = await fetch(`${window.location.origin}/api/client?page=${page}`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
        "Accept": "application/json", 
        "Authorization": csrf_token,
        "X-CSRF-TOKEN": csrf_token,
      },
      body: JSON.stringify(params)
    });
  
    if (req.status !== 200) {
      return null
    }
  
    const data = await req.json();
    const dataTable = data.data;

    setPage(page);
    setTableData(dataTable);
    setLastPage(data.last_page);
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    
    dataFetchedRef.current = true;
    renderedFirstly();

    fetchClients(page, searchParams);
    jqueryTable();
  },[])

  return <>
    <h3>Clients</h3>

    <FilterClient 
      searchParams={searchParams}
      filterName={(val) => setSearchParams(oldParams => {oldParams.client_name = val; return oldParams})}
      filterAddress={(val) => setSearchParams(oldParams => {oldParams.client_address = val; return oldParams})}
      submit={() => {
        fetchClients(1, searchParams)
      }}
      clear={() => {
        const resetParams = {client_name: '', client_address: ''};
        setSearchParams(resetParams);
        fetchClients(1, resetParams);
      }}
    />

    <div className="my-4">
      <ModalCreateClient 
        className="mr-2" 
        finished={() => { 
          fetchClients(1, searchParams);
        }}
      />
    </div>

    <div className="card shadow mb-4">
      <div className="card-body">
        <div id="table-client" className="table-responsive">
          <table id="list-client">
            <thead>
                <tr>
                  <th>Action</th>
                  <th>Client Name</th>
                  <th>Client Address</th>
                </tr>
            </thead>
            <tbody>
              <TableItem />
            </tbody>
          </table>
        </div>

        <div className="mt-2 d-flex justify-content-end">

          <ButtonPaginationFirst click={() => { fetchClients(1, searchParams) }}  />
          <ButtonPaginationPrev click={() => { page > 1 && fetchClients(page - 1, searchParams) }} />
          <ButtonPagination />
          <ButtonPaginationNext click={() => { page < lastPage && fetchClients(page + 1, searchParams) }}  />
          <ButtonPaginationLast click={() => { fetchClients(lastPage, searchParams) }} />

        </div>

      </div>
    </div>
  </>;
}

if (document.getElementById("client")) {
  const Index = ReactDOM.createRoot(document.getElementById("client"));
  Index.render(
    <React.StrictMode>
      <Client />
    </React.StrictMode>
  );
}
