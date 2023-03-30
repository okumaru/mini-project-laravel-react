import React from "react";
import ReactDOM from "react-dom/client";

export default function FilterProject({clients, searchParams, filterName, filterClient, filterStatus, submit, clear}) {
  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="col-2">Filter</div>
          <div className="flex-grow-1 px-2">
            <div>Project Name</div>
            <div>
              <input 
                onChange={e => filterName(e.target.value)} 
                defaultValue={searchParams.project_name}
                type="text" 
                className="form-control" 
                id="project_name" 
                name="project_name" 
                aria-describedby="projectNameHelpBlock" 
                placeholder="Enter project name" 
              />
            </div>
          </div>
          <div className="col-3">
            <div>Client</div>
            <div>
              <select 
                onChange={e => filterClient(e.target.value)} 
                className="custom-select" 
                id="client_id" 
                name="client_id" 
                defaultValue={searchParams.client_id}
              >

                <option value="">All client</option>
                {clients.map((client, index) => {
                  return <option key={index} value={client.client_id}>{client.client_name}</option>
                })}
                
              </select>
            </div>
          </div>
          <div className="col-2">
            <div>Status</div>
            <div>
              <select 
                onChange={e => filterStatus(e.target.value)} 
                className="custom-select" 
                id="project_status" 
                name="project_status"
                defaultValue={searchParams.project_status}
              >

                <option value="">All status</option>
                <option value="OPEN">Open</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>

              </select>
            </div>
          </div>
          <div className="px-2">
            <button onClick={submit} className="btn btn-primary mr-2" type="button">Search</button>
          </div>
          <div className="">
            <button 
              className="btn btn-secondary mr-2" 
              type="button"
              onClick={() => { 
                
                $('#project_name').val('');
                $('#client_id').val('');
                $('#project_status').val('');
                clear();

              }} 
            >Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

if (document.getElementById("filter-project")) {
  const Index = ReactDOM.createRoot(document.getElementById("filter-project"));
  Index.render(
    <React.StrictMode>
      <FilterProject />
    </React.StrictMode>
  );
}
