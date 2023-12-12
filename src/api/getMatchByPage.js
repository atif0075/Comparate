import { useStore } from "../stores";
export default async function getMatchByPage(location, competitor, page) {
  console.log("page", page);
  const store = useStore();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + store.userDetails.access);

  var raw = JSON.stringify({
    location: location,
    competitor: competitor,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `http://95.216.148.92:8000/api/getmatch/?page=${page}`,
    requestOptions
  );
  const result = await response.json();
  return result;
}
