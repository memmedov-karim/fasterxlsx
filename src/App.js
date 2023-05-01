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
  const modifyString = (string) => {
    let originalString = "";
    for(let i of string){
      if(i==="W"){
        originalString+="ə";
      }
      else if(i==="s"){
        originalString+="Ş";
      }
      else if(i==="g"){
        originalString+="Ğ";
      }
      else if(i==="I"){
        originalString+="i"
      }
      else{
        originalString+=i;
      }
    }
    return originalString
  }
  const checkutis= (utis,remaind) => {
    if(remaind===""){
      return true
    }
    for(let i=0;i<utis.length;i++){
      if(remaind[i]!=="*" && remaind[i]!==utis[i]){
        return false
      }
    }
    return true
  }
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
  const [sccode,setsccode] = useState("");
  const [res,setres] = useState("");
  const FindScholName = (code) => {
    
    for(let i of SchoolCodes){
      if(i["Yeni Kod 5 rəqəmli ( rayon + məktəb)"]===code){
        return i["Məktəbin adı"]
      }
    }
    return "Məktəb tapılmadı"
  }

  const handSub = (e) => {
    e.preventDefault()
    if(sccode!==""){
      setres(FindScholName(sccode))
      setsccode("")

    }

  }
  const [ButtonsSet, setButtonSet] = React.useState([
    {
      ad: "Ad",
      id: "1",
      color: "green",
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
    {
      ad:"Məktəb",
      id: "8",
      color:"unset",
      value:"school"
    },
    {
      ad:"məktəb/ad",
      id: "9",
      color:"unset",
      value:"school_name"
    },
    {
      ad:"məktəb/utis",
      id: "10",
      color: "unset",
      value: "school_utis"


    }
  ]);
  const [SearchingData, setSearchingData] = React.useState(null);
  const [syntaxval, setSyntaxval] = React.useState("ad");
  const [searcingvalue, setSearchingValue] = React.useState("");
  const [onefield, setonefield] = React.useState(true);
  const [firstnonefieldplaceholder, setfirstnonefieldplaceholder] =
    React.useState("");
  const [secondnonefieldplaceholder, setsecondnonefieldplaceholder] =
    React.useState("");
  const GetSearchingValue = (e) => {
    setSearchingValue(e.target.value);
  };

  const [placeholder, setPlaceHolder] = React.useState("ad");
  const GetSearchingAndBack = (e, id) => {
    if (
      e.target.value === "ad" ||
      e.target.value === "ata_adı" ||
      e.target.value === "soyad" ||
      e.target.value === "utis_kod" ||
      e.target.value === "school"
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
          (obj) => ClearString(obj["ASA"].split(" ")[0]).toLocaleLowerCase() === searcingvalue.toLocaleLowerCase()
        )
      );
      // console.log(Data.filter(obj=>ClearString(obj["Ad"]).toLowerCase()===searcingvalue.toLowerCase()))
    } else if (syntaxval === "ata_adı") {
      setSearchingData(
        Data.filter(
          (obj) =>
            ClearString(obj["ASA"].split(" ")[2]).toLocaleLowerCase() === searcingvalue.toLocaleLowerCase()
        )
      );
    } else if (syntaxval === "soyad") {
      setSearchingData(
        Data.filter(
          (obj) =>
            ClearString(obj["ASA"].split(" ")[1]).toLocaleLowerCase() === searcingvalue.toLocaleLowerCase()
        )
      );
    } else if (syntaxval === "utis_kod") {
      setSearchingData(
        Data.filter(
          (obj) =>
            String(ClearString(obj["UTİS"]).toLocaleLowerCase()).includes(String(searcingvalue.toLocaleLowerCase()))
        )
      );
    }
    else if (syntaxval === "school"){

      setSearchingData(
        Data.filter(
          (obj) =>
          //String(ClearString(obj["UTİS"]).toLocaleLowerCase())
          String(ClearString(obj["Məktəb kodu"]).toLocaleLowerCase()).includes(String(searcingvalue.toLocaleLowerCase()))
            
        )
      );

    }
    // console.log(SearchingData);
    setSearchingValue("");
  };
  

 

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
            ClearString(obj["ASA"].split(" ")[0]).toLocaleLowerCase() === firstnonefield.toLocaleLowerCase() &&
            ClearString(obj["ASA"].split(" ")[1]).toLocaleLowerCase() === secondnonefield.toLocaleLowerCase()
        )
      );
    } else if (syntaxval === "ad_ata_adı") {
      setSearchingData(
        Data.filter(
          (obj) =>
            ClearString(obj["ASA"].split(" ")[0]).toLocaleLowerCase() === firstnonefield.toLocaleLowerCase() &&
            ClearString(obj["ASA"].split(" ")[2]).toLocaleLowerCase() === secondnonefield.toLocaleLowerCase()
        )
      );
    } else if (syntaxval === "soyad_ata_adı") {
      setSearchingData(
        Data.filter(
          (obj) =>
            ClearString(obj["ASA"].split(" ")[1]).toLocaleLowerCase() === firstnonefield.toLocaleLowerCase() &&
            ClearString(obj["ASA"].split(" ")[2]).toLocaleLowerCase() === secondnonefield.toLocaleLowerCase()
        )
      );
    }
    else if (syntaxval === "school_name"){
      setSearchingData(
        Data.filter(
          (obj) =>
            String(ClearString(obj["Məktəb kodu"]).toLocaleLowerCase()).includes(String(firstnonefield.toLocaleLowerCase())) &&
            ClearString(obj["ASA"].split(" ")[0]).toLocaleLowerCase() === secondnonefield.toLocaleLowerCase()
        )
      );

    }
    else{
      setSearchingData(
        Data.filter(
          (obj) =>
          String(ClearString(obj["Məktəb kodu"]).toLocaleLowerCase()).includes(String(firstnonefield.toLocaleLowerCase())) &&
          String(ClearString(obj["UTİS"]).toLocaleLowerCase()).includes(String(secondnonefield.toLocaleLowerCase()))
        )
      );

    }
  };
  const [dt,setDt] = useState("");
  const handleClick = () => {
    setDt(SchoolCodes[0]["Məktəbin adı"])
  }
  const goArti = () => {
    window.location.href = "https://arti.edu.az/"
  }
  const [searchingData,setData] = useState({
    ad:"",
    soyad:"",
    ata:"",
    utis:"",
    məktəb:"",
    bölmə:"",
    sinif:""
  })
  const getData = (e) => {
    const {name,value} = e.target;
    setData(prev=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }
  const find = (e) => {
    e.preventDefault();
  const data = Data.filter(
      (obj) => ClearString(obj["Ad"]).toLocaleLowerCase().includes(searchingData["ad"].toLocaleLowerCase()) && ClearString(obj["Soyad"]).toLocaleLowerCase().includes(searchingData["soyad"].toLocaleLowerCase()) && ClearString(obj["Ata adı"]).toLocaleLowerCase().includes(ClearString(searchingData["ata"]).toLocaleLowerCase()) && (String(ClearString(obj["Utis"]).toLocaleLowerCase()).includes(searchingData["utis"].toLocaleLowerCase()) || checkutis(String(obj["Utis"]),searchingData["utis"])) &&
      String(ClearString(obj["Məktəb kodu"]).toLocaleLowerCase()).includes(String(searchingData["məktəb"].toLocaleLowerCase())) && ClearString(obj["Bölmə"]).toLocaleLowerCase().includes(searchingData["bölmə"].toLocaleLowerCase()) && String(ClearString(obj["sinif"]).toLocaleLowerCase()).includes(searchingData["sinif"].toLocaleLowerCase())
    );

    // console.log(res) 
    setSearchingData(data)
    setData({
      ad:"",
      soyad:"",
      ata:"",
      utis:"",
      məktəb:"",
      bölmə:"",
      sinif:""
    })
    
  }
   const Students = SearchingData?.map((user, ind) => {
    let name = FindScholName(String(user["Məktəb kodu"]));
    let otherInfo = `Mərkəz:${user["Mərkəz"]},Otaq:${user["otaq"]},Yer:${user["yer"]}`;
    let res = name+ "||" + otherInfo;
    return (
      <div title={res} key={ind} className="user">
        <pre>
          <strong style={{ fontSize: "15px" }}>{ind + 1}-</strong>{" "}
          |<strong>Ad:</strong>
          <i >{user["Ad"]}</i>|<strong>Soyad:</strong>
          <i>{user["Soyad"]}</i>|<strong>Ata adı:</strong>
          <i>{user["Ata adı"]}</i>|<strong>Mekteb kodu:</strong>
          <i>{user["Məktəb kodu"]}</i>|<strong>Utis kodu:</strong>
          <i style={{color:"black"}}>{user["Utis"]}</i>|<strong>Sinif:</strong>
          <i>{user["sinif"]}</i>|<strong>Bölmə:</strong>
          <i>{user["Bölmə"]}</i>|<strong>Fənn:</strong>
          <i>{user["istiqamet"]}</i>|

          
        </pre>
      </div>
    );
  });
  return (
    <div className="App">
    <form className="cd" onSubmit={handSub}>
        <input placeholder="məktəb kodu" type="text" value={sccode} onChange={(e)=>{setsccode(e.target.value)}} />
        <input type="submit" value="axtar" />
        {res}
      </form>
  
      <form onSubmit={find}>
  <div className="form-row">
    <input onChange={getData} type="text" placeholder="Ad" name="ad" value={searchingData.ad}/>
    <input onChange={getData} type="text" placeholder="Soyad" name="soyad" value={searchingData.soyad}/>
    <input onChange={getData} type="text" placeholder="Ata" name="ata" value={searchingData.ata}/>
    <input onChange={getData} type="text" placeholder="Utis" name="utis" value={searchingData.utis}/>
  </div>
  <div className="form-row">
    <input onChange={getData} type="text" placeholder="Məktəb" name="məktəb" value={searchingData.məktəb}/>
    <input onChange={getData} type="text" placeholder="Bölmə" name="bölmə" value={searchingData.bölmə}/>
    <input onChange={getData} type="text" placeholder="Sinif" name="sinif" value={searchingData.sinif}/>
    <input type="submit" value="Axtar"/>
  </div>
</form>
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
