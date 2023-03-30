import React, { useState, useEffect } from "react";

const updateProject = async (projectId, projectName, clientId, projectStart, projectEnd, status) => {
  const req = await fetch(`${window.location.origin}/api/project/${projectId}`, { 
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
      project_start: projectStart ,
      project_end: projectEnd ,
      project_status: status ,
    })
  });

  const res = await req.json();

  if (req.status !== 200) {
    if (res.errors) {
      for (const elm in res.errors) {
        const inputElm = $(`.updateProjectModal${projectId} .needs-validation #${elm}`);
        inputElm.addClass('is-invalid');
        
        const messages = res.errors[elm];
        messages.map(mess => $(`<div class="invalid-feedback">${mess}</div>`).insertAfter(inputElm))
      }
    }
  }

  return req;
}

export default function ModalUpdateProject({ data, clients, finished }) {

  const [projectName, setProjectName] = useState(data.project_name);
  const [clientId, setClientId] = useState(data.client_id);
  const [projectStart, setProjectStart] = useState(data.project_start);
  const [projectEnd, setProjectEnd] = useState(data.project_end);
  const [status, setStatus] = useState('OPEN');

  useEffect(() => {
    $('.project_start').datepicker({
      format: "yyyy-mm-dd",
      startDate: new Date()
    }).on("change", function(e) {
      setProjectStart(e.target.value);
    });

    $('.project_end').datepicker({
      format: "yyyy-mm-dd",
      startDate: new Date()
    }).on("change", function(e) {
      setProjectEnd(e.target.value);
    });
  },[])

  return <>
    <a href="#" data-bs-toggle="modal" data-bs-target={`.updateProjectModal${data.project_id}`}>Edit</a>
    <div data-bs-backdrop="static" className={`modal fade updateProject updateProjectModal${data.project_id}`} tabIndex="-1" role="dialog" aria-labelledby={`#updateProjectModal${data.project_id}Lable`} aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`#updateProjectModal${data.project_id}Lable`}>Update Project</h5>
            <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className="needs-validation">

              <div className="form-group">
                <label htmlFor="project_name">Name</label>
                <input 
                  onChange={e => setProjectName(e.target.value)} 
                  defaultValue={data.project_name}
                  type="text" 
                  className="form-control" 
                  id="project_name" 
                  name="project_name" 
                  aria-describedby="projectNameHelpBlock" 
                  placeholder="Enter project name" 
                />
              </div>

              <div className="form-group">
                <label htmlFor="client_id">Client</label>
                <select 
                  onChange={e => setClientId(e.target.value)} 
                  className="custom-select" 
                  id="client_id" 
                  name="client_id" 
                  defaultValue={data.client_id} 
                  aria-describedby="clientHelpBlock" 
                >

                  {clients.map((client, index) => {
                    return <option key={index} value={client.client_id}>{client.client_name}</option>
                  })}
                  
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="project_start">Project Start</label>
                <input 
                  type="text" 
                  defaultValue={data.project_start} 
                  className="form-control project_start" />
              </div>

              <div className="form-group">
                <label htmlFor="project_end">Project End</label>
                <input 
                  type="text" 
                  defaultValue={data.project_end} 
                  className="form-control project_end" />
              </div>

              <div className="form-group">
                <label htmlFor="project_status">Status</label>
                <select 
                  onChange={e => setStatus(e.target.value)} 
                  className="custom-select" 
                  id="project_status" 
                  name="project_status"
                  value={data.project_status} 
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
            <button 
              className="btn btn-warning" 
              type="button"
              onClick={() => {
                updateProject(
                  data.project_id, 
                  projectName,
                  clientId,
                  projectStart,
                  projectEnd,
                  status
                ).then((res) => {
                  if (res.ok) {
                    
                    finished();
                    $(`.updateProjectModal${data.project_id}`).modal('toggle');

                  }
                })
              }}
            >Update</button>
          </div>
        </div>
      </div>
    </div>
  </>
}
