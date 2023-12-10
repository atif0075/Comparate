import { useStore } from "../stores";
export default async function getMatchedProducts(location, competitor) {
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
    "http://135.181.86.202:8000/api/getmatch/",
    requestOptions
  );
  const result = await response.json();
  return result;
}
