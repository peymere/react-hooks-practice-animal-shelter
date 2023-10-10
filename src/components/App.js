import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";
import { response } from "msw";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(() => {
    onFindPetsClick()
  }, [])

  const onChangeType = (e) => {
    setFilters(e.target.value)
  }
  const onFindPetsClick = () => {
    let url = "http://localhost:3001/pets"
    if (filters.type !== "all") {
      url += `?type=${filters}`
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error(error))
  }
  const onAdoptPet = (id) => {
    const adoptedPets = pets.map((pet) => {
    if (id === pet.id) {
      return {...pet, isAdopted: true}
    }
    return pet 
    })
    setPets(adoptedPets) 
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;