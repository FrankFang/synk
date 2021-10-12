import { v4 as uuidv4 } from 'uuid';

let clientId = localStorage.getItem('clientId')
if (clientId?.length !== 36) {
  clientId = uuidv4();
  localStorage.setItem('clientId', clientId)
}

export { clientId }
