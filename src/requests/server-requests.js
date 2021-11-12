const fetchRequest = async ({ path, method, body, headers, handler, errorHandler }) => {
  let result = null;
  try {
    const response = await fetch(`http://localhost:5000/api/v1/${path}`, {
      method: method ?? 'GET',
      body,
      headers
    });

    const dataJSON = await response.json();
    result = await handler(dataJSON);
  } catch (err) {
    console.error(err);
    errorHandler && errorHandler(err);
  }

  return result;
};

export default fetchRequest;
