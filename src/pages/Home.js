import { useState } from "react";
import TableToExcel from "@linways/table-to-excel";


export default function Home() {
  const [filename, setFilename] = useState();
  const [tmppath, setTmppath] = useState();
  let [htmlFileString, setHtmlFileString] = useState();

  const upload = async (e) => {
    //SET Filename
    setFilename(e.target.files[0].name.split('.')[0])

    //SET File String //Load on UI
    setTmppath(URL.createObjectURL(e.target.files[0]));
    setHtmlFileString(await (await fetch(URL.createObjectURL(e.target.files[0]))).text());
  }

  const convert = async (event) => {
    var iframe = document.getElementById("UploadedFile");
    var tables = iframe.contentWindow.document.getElementsByTagName("table");

    for (var i = 0; i < tables.length; i++) {
      await TableToExcel.convert(iframe.contentWindow.document.getElementsByTagName("table")[i], {
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
      {tmppath && <h3>Uploaded File</h3>}
      {tmppath &&<iframe id="UploadedFile" src={tmppath} width="98%" height="480"/>}
    </div>
  );
}
