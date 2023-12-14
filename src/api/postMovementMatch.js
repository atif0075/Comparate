import { useStore } from "../stores";

export default async function getUpload(fileInput) {
  const store = useStore();
  let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + store.userDetails.access);

  var formdata = new FormData();
  formdata.append("file", fileInput.raw, fileInput.name);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(
    "http://95.216.148.92:8000/api/movementmatch/",
    requestOptions
  );
  const result = await response.json();
  return result;
}
