import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import FilterProject from "../components/FilterProject";
import { 
  ButtonPaginationFirst, 
  ButtonPaginationPrev, 
  ButtonPaginationNext, 
  ButtonPaginationLast,
  ButtonPaginationNumber
} from "../components/buttons/Buttons";
import { 
  ModalCreateProject,
  ModalUpdateProject,
  ModalDeleteProject
} from "../components/modals/Modals"

import { dateFormatter } from "../utils/date";

const jqueryTable = () => {
  $('#list-project').DataTable({
    paging: false,
    searching: false,
    ordering: false,
    info: false,
  });

  $('#list-project > tbody > tr.odd').remove();
}

export default function Project() {

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [clients, setClients] = useState([]);
  const [searchParams, setSearchParams] = useState({project_name: '', client_id: '', project_status: ''});

  const [counter, setCounter] = useState(0);
  const dataFetchedRef = useRef(false);
  const renderedFirstly = () => {
    setCounter((oldValue) => oldValue+1);
  }

  const isAllChecked = tableData.map(data => data.checked).every(checked => checked === true);

  const ButtonPagination = () => {
    const buttonPages = [...Array(lastPage).keys()];
    return buttonPages.map((pageNumber, index) => {

      pageNumber += 1;
      if (pageNumber > page + 1 || pageNumber < page - 1) return

      return <ButtonPaginationNumber 
        key={index}
        click={() => fetchProjects(pageNumber, searchParams)} 
        pageNumber={pageNumber} 
        isActive={page === pageNumber}
      />
    })
  }

  const TableItem = () => {
    return tableData.map( (data, index) => {
      return <tr key={index}>
        <td> 
          <input 
            type="checkbox" 
            checked={(data.checked || deleteData.includes(data.project_id)) && "checked"} 
            onChange={(e) => {
              data.checked = e.target.checked;

              if (e.target.checked) {
                setDeleteData(oldIds => [...oldIds, data.project_id]);
              }

              if (!e.target.checked) {
                const newIds = deleteData.filter(id => data.project_id !== id)
                setDeleteData(newIds);
              }
            }} 
          /> 
        </td>
        <td> 
          <ModalUpdateProject 
            data={data} 
            clients={clients} 
            finished={() => { fetchProjects(1, searchParams) }}
          /> 
        </td>
        <td> { data.project_name } </td>
        <td> { data.client_name } </td>
        <td> { dateFormatter(data.project_start) } </td>
        <td> { dateFormatter(data.project_end) } </td>
        <td> { data.project_status } </td>
      </tr>
    })
  }

  const getAllClients = async () => {
    const req = await fetch(`${window.location.origin}/api/clients`, { 
      method: "GET", 
      headers: { 
        "Content-Type": "application/json", 
        "Accept": "application/json", 
        "Authorization": csrf_token,
        "X-CSRF-TOKEN": csrf_token,
      },
    });
  
    if (req.status !== 200) {
      return null
    }
  
    const data = await req.json();
    setClients(data) ;
  }

  const fetchProjects = async (page = 1, params) => {
    console.log(params);
    const req = await fetch(`${window.location.origin}/api/project?page=${page}`, { 
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
    const dataTable = data.data.map(data => { 
      data.checked = deleteData.includes(data.project_id); 
      return data; 
    });

    setPage(page);
    setTableData(dataTable);
    setLastPage(data.last_page);
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    
    dataFetchedRef.current = true;
    renderedFirstly();

    fetchProjects(page, searchParams);
    getAllClients();
    jqueryTable();
  },[])

  return <>
    <h3>Projects</h3>

    <FilterProject 
      clients={clients} 
      searchParams={searchParams}
      filterName={(val) => setSearchParams(oldParams => {oldParams.project_name = val; return oldParams})}
      filterClient={(val) => setSearchParams(oldParams => {oldParams.client_id = val; return oldParams})}
      filterStatus={(val) => setSearchParams(oldParams => {oldParams.project_status = val; return oldParams})}
      submit={() => {
        fetchProjects(1, searchParams)
      }}
      clear={() => {
        const resetParams = {project_name: '', client_id: '', project_status: ''};
        setSearchParams(resetParams);
        fetchProjects(1, resetParams);
      }}
    />

    <div className="my-4">
      <ModalCreateProject 
        clients={clients} 
        className="mr-2" 
        finished={() => { 
          // const resetParams = {project_name: '', client_id: '', project_status: ''};
          // setSearchParams(resetParams);
          fetchProjects(1, searchParams);
        }}
      />
      <ModalDeleteProject 
        projects={deleteData} 
        finished={() => { 
          // const resetParams = {project_name: '', client_id: '', project_status: ''};
          // setSearchParams(resetParams);
          fetchProjects(1, searchParams);
        }} 
      />
    </div>

    <div className="card shadow mb-4">
      <div className="card-body">
        <div id="table-project" className="table-responsive">
          <table id="list-project">
            <thead>
                <tr>
                  <th>
                    <input 
                      type="checkbox" 
                      checked={isAllChecked && 'checked'}
                      onChange={ e => { 
                        const newData = tableData.map(data => { 
                          data.checked = e.target.checked; 
                          return data; 
                        });

                        const projectIds = tableData.map(data => data.project_id);

                        if (e.target.checked) {
                          setDeleteData(oldIds => [...oldIds, ...projectIds]);
                        }

                        if (!e.target.checked) {
                          const newIds = deleteData.filter(id => !projectIds.includes(id))
                          setDeleteData(newIds);
                        }

                        setTableData(newData);
                      }} 
                    />
                  </th>
                  <th>Action</th>
                  <th>Project Name</th>
                  <th>Client</th>
                  <th>Project Start</th>
                  <th>Project End</th>
                  <th>Status</th>
                </tr>
            </thead>
            <tbody>
              <TableItem />
            </tbody>
          </table>
        </div>

        <div className="mt-2 d-flex justify-content-end">

          <ButtonPaginationFirst click={() => { fetchProjects(1, searchParams) }}  />
          <ButtonPaginationPrev click={() => { page > 1 && fetchProjects(page - 1, searchParams) }} />
          <ButtonPagination />
          <ButtonPaginationNext click={() => { page < lastPage && fetchProjects(page + 1, searchParams) }}  />
          <ButtonPaginationLast click={() => { fetchProjects(lastPage, searchParams) }} />

        </div>

      </div>
    </div>
  </>;
}

if (document.getElementById("project")) {
  const Index = ReactDOM.createRoot(document.getElementById("project"));
  Index.render(
    <React.StrictMode>
      <Project />
    </React.StrictMode>
  );
}
