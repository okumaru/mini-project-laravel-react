import React, { useState } from "react";

const createProject = async (projectName, clientId, status) => {

  $('.form-group .invalid-feedback').remove();
  $('.form-group > *').removeClass('is-invalid');

  const req = await fetch(`${window.location.origin}/api/project/create`, { 
    method: "POST", 
    headers: { 
      "Content-Type": "application/json", 
      "Accept": "application/json", 
      "Authorization": csrf_token,
      "X-CSRF-TOKEN": csrf_token,
    },
    body: JSON.stringify({ 
      project_name: projectName ,
      client_id: clientId ,
      project_status: status ,
    })
  });

  const res = await req.json();

  if (req.status !== 200) {

    if (res.errors) {
      for (const elm in res.errors) {
        const inputElm = $(`#createProjectModal .needs-validation #${elm}`);
        inputElm.addClass('is-invalid');
        
        const messages = res.errors[elm];
        messages.map(mess => $(`<div class="invalid-feedback">${mess}</div>`).insertAfter(inputElm))
      }
    }
  }

  return req;
}

export default function ModalCreateProject({clients, finished}) {

  const [projectName, setProjectName] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [status, setStatus] = useState('OPEN');

  return <>
    <button className="btn btn-primary mr-2" type="button" data-bs-toggle="modal" data-bs-target="#createProjectModal">New</button>
    <div className="modal fade" id="createProjectModal" tabIndex="-1" role="dialog" aria-labelledby="createProjectModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createProjectModalLabel">Add New Project</h5>
            <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className="needs-validation">
              <div className="form-group">
                <label htmlFor="project_name">Name</label>
                <input 
                  onChange={e => setProjectName(e.target.value)} 
                  type="text" 
                  className="form-control" 
                  id="project_name" 
                  name="project_name" 
                  placeholder="Enter project name" 
                  defaultValue=""
                />
              </div>
              <div className="form-group">
                <label htmlFor="client_id">Client</label>
                <select 
                  onChange={e => setClientId(e.target.value)} 
                  className="custom-select" 
                  id="client_id" 
                  name="client_id" 
                  defaultValue="" 
                  aria-describedby="clientHelpBlock" 
                >
                  <option value="">Select client</option>
                  {clients.map((client, index) => {
                    return <option key={index} value={client.client_id}>{client.client_name}</option>
                  })}
                  
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="project_status">Status</label>
                <select 
                  onChange={e => setStatus(e.target.value)} 
                  className="custom-select" 
                  id="project_status" 
                  name="project_status"
                  defaultValue="OPEN" 
                >
                  <option value="OPEN">Open</option>
                  <option value="DOING">Doing</option>
                  <option value="DONE">Done</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" type="button" data-bs-dismiss="modal">Close</button>
            <button className="btn btn-primary" type="button" onClick={() => {
              createProject(
                projectName, 
                clientId, 
                status
              ).then((res) => {
                if (res.ok) {

                  setProjectName(null);
                  setClientId(null);
                  setStatus("OPEN");
                  $("#createProjectModal #project_name").val('');
                  $("#createProjectModal #client_id").val('');
                  $("#createProjectModal #project_status").val('OPEN');

                  $('#createProjectModal').modal('toggle');
                  finished();

                }
              });
            }}>Save</button>
          </div>
        </div>
      </div>
    </div>
  </>
}
