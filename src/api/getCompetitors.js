import { useStore } from "../stores";
export default async function getCompetitors() {
  const store = useStore();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + store.userDetails.access);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    "http://95.216.148.92:8000/api/competitors/",
    requestOptions
  );
  const result = await response.json();
  return result;
}
