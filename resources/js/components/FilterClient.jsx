import React from "react";
import ReactDOM from "react-dom/client";

export default function FilterProject({ searchParams, filterName, filterAddress, submit, clear}) {
  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="col-2">Filter</div>
          <div className="flex-grow-1 px-2">
            <div>Client Name</div>
            <div>
              <input 
                onChange={e => filterName(e.target.value)} 
                defaultValue={searchParams.client_name}
                type="text" 
                className="form-control" 
                id="client_name" 
                name="client_name" 
                placeholder="Enter client name" 
              />
            </div>
          </div>
          <div className="col-3">
            <div>Client Address</div>
            <div>
              <input 
                onChange={e => filterAddress(e.target.value)} 
                defaultValue={searchParams.client_address}
                type="text" 
                className="form-control" 
                id="client_address" 
                name="client_address" 
                placeholder="Enter client address" 
              />
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
                
                $('#client_name').val('');
                $('#client_address').val('');
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
