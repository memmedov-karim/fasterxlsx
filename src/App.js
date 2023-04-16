import Data from "./rfo1.json";
import SchoolCodes from './codes.json'
import "./App.css";
import React, { useState } from "react";
function App() {
  // for(let i of Data["Ümumi"]){
  //   if(i["utis_code"]===1670649){
  //     console.log(i)
  //   }
  // }
  // 1670649
  const [numberOfGirl,setnumberOfGirl] = React.useState(null);
  const [numberOfBoy,setnumberOfBoy] = React.useState(null);
  const FindNumOfGirl = (data) => {
    let count = 0;
    for(let i of data){
      if(i.ataadi.split(" ")[1] === "qızı"){
        count+=1
      }

    }
    setnumberOfGirl(count);
  }
  const FindNumOfBoy = (data) => {
    let count = 0;
    for(let i of data){
      if(i.ataadi.split(" ")[1] === "oğlu"){
        count+=1
      }

    }
    setnumberOfBoy(count);
  }
  // FindNumOfGirl(Data["Ümumi"]);
  const ShowGirl = () => {
    FindNumOfGirl(Data["Ümumi"])
    setTimeout(()=>{
      setnumberOfGirl(null)

    },2000)
    
  }
  const ShowBoy = () => {
    FindNumOfBoy(Data["Ümumi"])
    setTimeout(()=>{
      setnumberOfBoy(null)

    },2000)
  }
  console.log(numberOfGirl)
  
  const ShowSchoolCode = (school_name) => {
    for(let i of SchoolCodes){
      if(i["Məktəbin adı"]===school_name){
        return i["Yeni Kod 5 rəqəmli ( rayon + məktəb)"]
      }
    }
  }
  // console.log(ShowSchoolCode("Xəlilli kənd tam orta məktəb"))
  // console.log(ShowSchoolCode("Naxçıvan şəhər Kimya-Biologiya Təmayüllü Lisey"))
  // console.log(Data["Ümumi"].length)
  const ClearString = (val) => {
    let neww = "";
    for (let i of String(val)) {
      if (i !== " " && i !== "") {
        neww += i;
      }
    }
    return neww.toLocaleLowerCase();
  };
  // for(let i of ClearString("YUSİF       ")){
  //   console.log(i)
  // }
  // console.log(ClearString("FİDAN       ").length,"fidan".toLowerCase().length)
  // console.log("YUSİF       ".length,"SÜLEYMAN    ".length,"FİDAN       ".length)
  // console.log("fidann".toLowerCase().length,ClearString(Data[1]["Ad"]).toLowerCase().length)
  // console.log(Data[0]["Ata adı"])\
  const [ButtonsSet, setButtonSet] = React.useState([
    {
      ad: "Ad",
      id: "1",
      color: "unset",
      value: "ad",
    },
    {
      ad: "Ata adı",
      id: "2",
      color: "unset",
      value: "ata_adı",
    },
    {
      ad: "Soyad",
      id: "3",
      color: "unset",
      value: "soyad",
    },
    {
      ad: "Utis kodu",
      id: "4",
      color: "unset",
      value: "utis_kod",
    },
    {
      ad: "Ad/Soyad",
      id: "5",
      color: "unset",
      value: "ad_soyad",
    },
    {
      ad: "Ad/Ata adı",
      id: "6",
      color: "unset",
      value: "ad_ata_adı",
    },
    {
      ad: "Soyad/Ata adı",
      id: "7",
      color: "unset",
      value: "soyad_ata_adı",
    },
  ]);
  const [SearchingData, setSearchingData] = React.useState(null);
  const [syntaxval, setSyntaxval] = React.useState("");
  const [searcingvalue, setSearchingValue] = React.useState("");
  const [onefield, setonefield] = React.useState(true);
  const [firstnonefieldplaceholder, setfirstnonefieldplaceholder] =
    React.useState("");
  const [secondnonefieldplaceholder, setsecondnonefieldplaceholder] =
    React.useState("");
  const GetSearchingValue = (e) => {
    setSearchingValue(e.target.value);
  };

  const [placeholder, setPlaceHolder] = React.useState("");
  const GetSearchingAndBack = (e, id) => {
    if (
      e.target.value === "ad" ||
      e.target.value === "ata_adı" ||
      e.target.value === "soyad" ||
      e.target.value === "utis_kod"
    ) {
      setonefield(true);
    } else {
      setfirstnonefieldplaceholder(e.target.value.split("_")[0]);
      setsecondnonefieldplaceholder(e.target.value.split("_")[1]);
      setonefield(false);
    }

    setSyntaxval(e.target.value);
    setSearchingValue("");
    const ReturnedData = ButtonsSet.map((obj) =>
      obj.id === id ? { ...obj, color: "green" } : { ...obj, color: "unset" }
    );
    setButtonSet(ReturnedData);

    // console.log(e.target.value,id)
    setPlaceHolder(e.target.value);
  };
  const SearchData = (e) => {
    e.preventDefault();
    // console.log(searcingvalue,syntaxval);
    if (syntaxval === "ad") {
      setSearchingData(
        Data.filter(
          (obj) => ClearString(obj["ASA"].split(" ")[0]) === searcingvalue.toLocaleLowerCase()
        )
      );
      // console.log(Data.filter(obj=>ClearString(obj["Ad"]).toLowerCase()===searcingvalue.toLowerCase()))
    } else if (syntaxval === "ata_adı") {
      setSearchingData(
        Data.filter(
          (obj) =>
            ClearString(obj["ASA"].split(" ")[2]) === searcingvalue.toLocaleLowerCase()
        )
      );
    } else if (syntaxval === "soyad") {
      setSearchingData(
        Data.filter(
          (obj) =>
            ClearString(obj["ASA"].split(" ")[1]) === searcingvalue.toLocaleLowerCase()
        )
      );
    } else if (syntaxval === "utis_kod") {
      setSearchingData(
        Data.filter(
          (obj) =>
            String(ClearString(obj["UTİS"])) === String(searcingvalue.toLocaleLowerCase())
        )
      );
    }
    // console.log(SearchingData);
    setSearchingValue("");
  };

  const Students = SearchingData?.map((user, ind) => {
    return (
      <div key={ind} className="user">
        <pre>
          <strong style={{ fontSize: "15px" }}>{ind + 1}-</strong>{" "}
          |<strong>Ad:</strong>
          <i >{user["ASA"].split(" ")[0]}</i>|<strong>Soyad:</strong>
          <i>{user["ASA"].split(" ")[1]}</i>|<strong>Ata adı:</strong>
          <i>{user["ASA"].split(" ")[2]}</i>|<strong>Mekteb kodu:</strong>
          <i>{user["Məktəb kodu"]}</i>|<strong>Utis kodu:</strong>
          <i style={{color:"white"}}>{user["UTİS"]}</i>|<strong>Sinif:</strong>
          <i>{user["Sinif"]}</i>|<strong>Bölmə:</strong>
          <i>{user["Bölmə"]}</i>|

          
        </pre>
      </div>
    );
  });

  const Buttons = ButtonsSet.map((btn, ind) => {
    return (
      <button
        key={ind}
        value={btn.value}
        onClick={(e, id) => GetSearchingAndBack(e, btn.id)}
        style={{ backgroundColor: btn.color }}
        id={btn.id}
      >
        {btn.ad}
      </button>
    );
  });
  const [firstnonefield, setfirstnonefield] = React.useState("");
  const [secondnonefield, setsecondnonefield] = React.useState("");
  const GetFirstNoneField = (e) => {
    setfirstnonefield(e.target.value);
  };
  const GetSecondNoneField = (e) => {
    setsecondnonefield(e.target.value);
  };
  const SearchNoneField = (e) => {
    e.preventDefault();
    // console.log(firstnonefield, secondnonefield);
    if (syntaxval === "ad_soyad") {
      setSearchingData(
        Data.filter(
          (obj) =>
            ClearString(obj["ASA"].split(" ")[0]) === firstnonefield.toLocaleLowerCase() &&
            ClearString(obj["ASA"].split(" ")[1]) === secondnonefield.toLocaleLowerCase()
        )
      );
    } else if (syntaxval === "ad_ata_adı") {
      setSearchingData(
        Data.filter(
          (obj) =>
            ClearString(obj["ASA"].split(" ")[0]) === firstnonefield.toLocaleLowerCase() &&
            ClearString(obj["ASA"].split(" ")[2]) === secondnonefield.toLocaleLowerCase()
        )
      );
    } else {
      setSearchingData(
        Data.filter(
          (obj) =>
            ClearString(obj["ASA"].split(" ")[1]) === firstnonefield.toLocaleLowerCase() &&
            ClearString(obj["ASA"].split(" ")[2]) === secondnonefield.toLocaleLowerCase()
        )
      );
    }
  };
  const [dt,setDt] = useState("");
  const handleClick = () => {
    setDt(SchoolCodes[0]["Məktəbin adı"])
  }
  return (
    <div className="App">
      <button onClick={handleClick}>Click test</button>
      {dt}
      <button style={{backgroundColor:"white",marginTop:"10px"}} onClick={ShowBoy}>{numberOfBoy?numberOfBoy:"Oğlan"}</button><button style={{backgroundColor:"white" ,marginTop:"10px"}} onClick={ShowGirl}>{numberOfGirl?numberOfGirl:"Qız"}</button>
      <h1>Excel Cədvəlində Sürətli Axtarış</h1>
      <div className="searchingvalue">{Buttons}</div>

      {onefield && (
        <form onSubmit={SearchData}>
          <input
            value={searcingvalue}
            onChange={GetSearchingValue}
            placeholder={placeholder}
          />
        </form>
      )}
      {!onefield && (
        <form onSubmit={SearchNoneField}>
          <input
            value={firstnonefield}
            onChange={GetFirstNoneField}
            placeholder={firstnonefieldplaceholder}
          />
          <input
            style={{ marginLeft: "2px" }}
            value={secondnonefield}
            onChange={GetSecondNoneField}
            placeholder={secondnonefieldplaceholder}
          />
          <button type="submit">axtar</button>
        </form>
      )}
      {SearchingData && <div className="general">{Students}</div>}
      {SearchingData !== null && SearchingData.length === 0 ? (
        <div className="general">
          <h1 style={{ textAlign:"center",color: "red" }}>Məlumat tapılmadı</h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
