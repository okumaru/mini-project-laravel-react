import React, { useState } from "react";

const createClient = async (clientName, clientAddress) => {

  $('.form-group .invalid-feedback').remove();
  $('.form-group > *').removeClass('is-invalid');

  const req = await fetch(`${window.location.origin}/api/client/create`, { 
    method: "POST", 
    headers: { 
      "Content-Type": "application/json", 
      "Accept": "application/json", 
      "Authorization": csrf_token,
      "X-CSRF-TOKEN": csrf_token,
    },
    body: JSON.stringify({ 
      client_name: clientName ,
      client_address: clientAddress
    })
  });

  const res = await req.json();

  if (req.status !== 200) {

    if (res.errors) {
      for (const elm in res.errors) {
        const inputElm = $(`#createClientModal .needs-validation #${elm}`);
        inputElm.addClass('is-invalid');
        
        const messages = res.errors[elm];
        messages.map(mess => $(`<div class="invalid-feedback">${mess}</div>`).insertAfter(inputElm))
      }
    }
  }

  return req;
}

export default function ModalCreateClient({finished}) {

  const [clientName, setClientName] = useState(null);
  const [clientAddress, setClientAddress] = useState(null);

  return <>
    <button className="btn btn-primary mr-2" type="button" data-bs-toggle="modal" data-bs-target="#createClientModal">New</button>
    <div className="modal fade" id="createClientModal" tabIndex="-1" role="dialog" aria-labelledby="createClientModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createClientModalLabel">Add New Client</h5>
            <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className="needs-validation">

              <div className="form-group">
                <label htmlFor="client_name">Client Name</label>
                <input 
                  onChange={e => setClientName(e.target.value)} 
                  type="text" 
                  className="form-control" 
                  id="client_name" 
                  name="client_name" 
                  placeholder="Enter client name" 
                  defaultValue=""
                />
              </div>

              <div className="form-group">
                <label htmlFor="client_address">Client Address</label>
                <input 
                  onChange={e => setClientAddress(e.target.value)} 
                  type="text" 
                  className="form-control" 
                  id="client_address" 
                  name="client_address" 
                  placeholder="Enter client address" 
                  defaultValue=""
                />
              </div>
              
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" type="button" data-bs-dismiss="modal">Close</button>
            <button className="btn btn-primary" type="button" onClick={() => {
              createClient(
                clientName, 
                clientAddress, 
              ).then((res) => {
                if (res.ok) {

                  setClientName(null);
                  setClientAddress(null);
                  $("#createClientModal #client_name").val('');
                  $("#createClientModal #client_address").val('');

                  $('#createClientModal').modal('toggle');
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
