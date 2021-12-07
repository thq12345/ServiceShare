import React, { useEffect, useState } from "react";

function Categories() {
  let [Category_request, setCategory_request] = useState([]);

  //fetch data (Seek Help)
  useEffect(() => {
    async function runThis() {
      let raw = await fetch(`api/load-all-helpers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bol: 1,
        }),
      });
      let res = await raw.json();
      let categoryTemp = [];
      for (const element of res) {
        categoryTemp.push(element.Category);
      }
      //remove duplicate category options.
      categoryTemp = categoryTemp.filter(function (item, pos) {
        return categoryTemp.indexOf(item) === pos;
      });
      //load all distinct category into the dropdown bar
      setCategory_request(categoryTemp);
    }
    runThis().catch(console.dir);
  }, []);

  return (
    <>
      <option key="all" value="Select Category">
        Select Category
      </option>
      {Category_request.map((p, i) => (
        <option key={i} value={p}>
          {p}
        </option>
      ))}
    </>
  );
}

export default Categories;
