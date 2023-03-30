import React from "react";

const deleteProject = async (projectIds) => {
  const req = await fetch(`${window.location.origin}/api/project/delete`, { 
    method: "POST", 
    headers: { 
      "Content-Type": "application/json", 
      "Accept": "application/json", 
      "Authorization": csrf_token,
      "X-CSRF-TOKEN": csrf_token,
    },
    body: JSON.stringify({ ids: projectIds })
  });

  const res = await req.json();

  if (req.status !== 200) {
    console.error(res.message);
    return null
  }
}

export default function ModalDeleteProject({ projects, finished }) {
  
  return <>
    <button className="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#deleteProjectModal">Delete</button>
    <div className="modal fade" id="deleteProjectModal" tabIndex="-1" role="dialog" aria-labelledby="deleteProjectModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {projects.length === 0 && <>
            <div className="modal-header">
              <h5 className="modal-title" id="deleteProjectModalLabel">Delete Project</h5>
              <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Please choose a project to delete.
            </div>
          </>}

          {projects.length > 0 && <>
            <div className="modal-header">
              <h5 className="modal-title" id="deleteProjectModalLabel">Delete Project</h5>
              <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete those projects?
            </div>
            <div className="modal-footer">
              <button className="btn btn-light" type="button" data-bs-dismiss="modal">Close</button>
              <button 
                className="btn btn-danger" 
                type="button" 
                onClick={() => {

                  deleteProject(projects);
                  finished();
                  
                  $('#deleteProjectModal').removeClass('show');
                  $('.modal-backdrop.fade').remove();
                  $('#page-top').removeClass('modal-open');
                  $('#deleteProjectModal').remove();

                }} 
              >Delete</button>
            </div>
          </>}
          
        </div>
      </div>
    </div>
  </>
}
