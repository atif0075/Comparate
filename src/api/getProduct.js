import { useStore } from "../stores";

export default async function getProduct(id) {
  console.log("getProduct");
  const store = useStore();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + store.userDetails.access);

  var raw = JSON.stringify({
    product_id: id,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    "http://95.216.148.92:8000/api/movementprice/",
    requestOptions
  );
  const result = await response.json();
  console.log(result);
  return result;
}
