import React, { useState, useEffect, useTransition } from "react";
import ListBody from "./ListBody";
import SearchFile from "./SearchFormsSectors/SearchFormHospitals";
import "./Sectors.css";
import BigCard from "./SearchFormsSectors/BigCard";
import { useTranslation } from "react-i18next";
import i18n from "../../i18next";

function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const { t, i18n } = useTranslation();

  function fetchHospitals() {
    fetch("http://localhost:5000/hospitals")
      .then((response) => response.json())
      .then((data) => {
        setHospitals(data);
      });
  }
  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleListItemClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleCloseBigCard = () => {
    setSelectedHospital(null);
  };

  return (
    <div className="hospitals_body">
      <div className="title_div">
        <h2 className="title_sectors">{t("title_sector_hospitals")}</h2>
      </div>
      <div className="allBody">
        <div className="list-and-card">
          <div className="list">
            <ListBody items={hospitals} onItemClick={handleListItemClick} />
          </div>
          {selectedHospital && (
            <div className="big-card">
              <BigCard
                hospital={selectedHospital}
                onClose={handleCloseBigCard}
              />
            </div>
          )}
        </div>
        {!selectedHospital && (
          <div className="searchResult">
            <SearchFile />
          </div>
        )}
      </div>
    </div>
  );
}

export default Hospitals;
