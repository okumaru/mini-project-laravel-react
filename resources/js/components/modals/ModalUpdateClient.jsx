import React, { useState } from "react";

const updateClient = async (clientId, clientName, clientAddress) => {
  const req = await fetch(`${window.location.origin}/api/client/${clientId}`, { 
    method: "POST", 
    headers: { 
      "Content-Type": "application/json", 
      "Accept": "application/json", 
      "Authorization": csrf_token,
      "X-CSRF-TOKEN": csrf_token,
    },
    body: JSON.stringify({ 
      client_name: clientName ,
      client_address: clientAddress ,
    })
  });

  const res = await req.json();

  if (req.status !== 200) {
    if (res.errors) {
      for (const elm in res.errors) {
        const inputElm = $(`.updateClientModal${clientId} .needs-validation #${elm}`);
        inputElm.addClass('is-invalid');
        
        const messages = res.errors[elm];
        messages.map(mess => $(`<div class="invalid-feedback">${mess}</div>`).insertAfter(inputElm))
      }
    }
  }

  return req;
}

export default function ModalUpdateClient({ data, finished }) {

  const [clientName, setClientName] = useState(data.client_name);
  const [clientAddress, setClientAddress] = useState(data.client_address);

  return <>
    <a href="#" data-bs-toggle="modal" data-bs-target={`.updateClientModal${data.client_id}`}>Edit</a>
    <div data-bs-backdrop="static" className={`modal fade updateClient updateClientModal${data.client_id}`} tabIndex="-1" role="dialog" aria-labelledby={`#updateClientModal${data.client_id}Lable`} aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`#updateClientModal${data.client_id}Lable`}>Update Client</h5>
            <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className="needs-validation">

              <div className="form-group">
                <label htmlFor="client_name">Client Name</label>
                <input 
                  onChange={e => setClientName(e.target.value)} 
                  defaultValue={data.client_name}
                  type="text" 
                  className="form-control" 
                  id="client_name" 
                  name="client_name" 
                  placeholder="Enter client name" 
                />
              </div>

              <div className="form-group">
                <label htmlFor="client_address">Client Address</label>
                <input 
                  onChange={e => setClientAddress(e.target.value)} 
                  defaultValue={data.client_address}
                  type="text" 
                  className="form-control" 
                  id="client_address" 
                  name="client_address" 
                  placeholder="Enter client address" 
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" type="button" data-bs-dismiss="modal">Close</button>
            <button 
              className="btn btn-warning" 
              type="button"
              onClick={() => {
                updateClient(
                  data.client_id, 
                  clientName,
                  clientAddress,
                ).then((res) => {
                  if (res.ok) {
                    
                    finished();
                    $(`.updateClientModal${data.client_id}`).modal('toggle');

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
