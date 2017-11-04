// singleton?
let client = null
let _container, _sas, _svc

export { init, getClient, createBlob }
export default { init, getClient, createBlob }

// get the sas token and create the client
function init (svc, container, sasEndpoint, sasPerms='w') {
  _container = container

  fetchSAS(container, sasEndpoint, sasPerms)
    .then(token => {
      _sas = token.token
      return getClient(_sas, svc)
    })
}

// pass with credentials to set up a client the first time
// pass with credentials to update sas or both
// first call creates, other return cached
function getClient (sas, svc) {
  if (!_sas && !sas) return Promise.reject(new Error('az::getClient::first_call_requires_credentials'))
  if (!_svc && !svc) return Promise.reject(new Error('az::getClient::first_call_requires_credentials'))

  // use cached if none passed
  sas = sas || _sas
  svc = svc || _svc

  // construct client if none using passed over cached
  if (!client)
    client = window.AzureStorage.createBlobServiceWithSas(`https://${ svc }.blob.core.windows.net`, sas)

  // cache if passed
  if (svc) _svc = svc
  if (sas) _sas = sas

  return Promise.resolve(client)
}

function createBlob (file, container) {
  container = container || _container

  return new Promise ((res, rej) => {
    getClient()
    .then(client =>
      client.createBlockBlobFromBrowserFile(container, file.name, file, (err, result, response) => {
        if (err) rej(err)
        else res({ result, response})
      })
    )
  })
}

function fetchSAS (container, endpoint, perms) {
  // is this fug or what :DDDD
  return fetch(endpoint
    + '&container=' + container
    + '&permissions=' + perms || 'w'

    // options
    , {
      credentials: 'same-origin', // or 'include' for cors
      //headers: {},
      //body: JSON.stringify([])
      }
    )
    .then(resp => resp.json()
       // wrap u pthe response body togo with the status code and ok flag
      .then(data => ({
          ok: resp.ok,
          status: resp.status,
          token: data.token
      }))
    )
}
