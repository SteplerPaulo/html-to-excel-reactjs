import { useState } from "react";
import TableToExcel from "@linways/table-to-excel";


export default function Home() {
  const [filename, setFilename] = useState();
  let [htmlFileString, setHtmlFileString] = useState();

  const upload = async (e) => {
    //SET Filename
    setFilename(e.target.files[0].name.split('.')[0])

    //SET File String //Load on UI
    var tmppath = URL.createObjectURL(e.target.files[0]);
    setHtmlFileString(await (await fetch(tmppath)).text());
  }

  const convert = async (event) => {
    var tables = document.getElementsByTagName("table");

    for (var i = 0; i < tables.length; i++) {
      await TableToExcel.convert(document.getElementsByTagName("table")[i], {
        name: `${filename} ${i + 1}.xlsx`,
        sheet: {
          name: `Sheet 1`
        }
      });
    }
  }

  return (
    <div>
      <h1>Convert HTML to Excel</h1>

      <input type='file' onChange={(e) => upload(e)} />
      <button style={{ backgroundColor: "green", color: "white" }} onClick={convert}>Convert</button>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>
    </div>
  );
}
