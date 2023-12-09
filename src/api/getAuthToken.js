// api.js
export default async function getAuthToken(username, password) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://135.181.86.202:8000/api/token/",
      requestOptions
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propagate the error to the caller if needed
  }
}
