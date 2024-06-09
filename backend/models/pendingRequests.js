let pendingRequests = [];

const addRequest = (request) => {
  pendingRequests.push(request);
};

const getPendingRequests = () => {
  return pendingRequests;
};

const clearPendingRequests = () => {
  pendingRequests = [];
};

module.exports = { addRequest, getPendingRequests, clearPendingRequests };
