// // module this
// export const createSearchFunc = (data) => {
//   const datalist = document.getElementById("datalist");
//   if (counterForFunc > 0) {
//     let currentOptionLength = datalist.childNodes.length;
//     for (j = currentOptionLength; j < (currentOptionLength + data.results.length); j++)  {
//       const optionElement = document.createElement("option");
//       datalist.appendChild(optionElement);
//       datalist.childNodes[j].setAttribute("data-value", `${data.results[j-currentOptionLength].id}`);
//       datalist.childNodes[j].setAttribute("value", `${data.results[j-currentOptionLength].title}`);
//     }
//   } else {
//     for (i = 0; i < data.results.length; i++) {
//       const optionElement = document.createElement("option");
//       datalist.appendChild(optionElement);
//       // datalist.childNodes[i].value = data.results[i].id;
//       datalist.childNodes[i].setAttribute("data-value", `${data.results[i].id}`);
//       // datalist.childNodes[i].innerText = data.results[i].title;
//       datalist.childNodes[i].setAttribute("value", `${data.results[i].title}`);
//     }
//   }
//   counterForFunc++;
//   console.log(counterForFunc);
// }