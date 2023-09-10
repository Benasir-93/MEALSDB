import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Meals() {
  const [allData, setAllData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noFoodFound, setNoFoodFound] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setAllData([]);
      setNoFoodFound(false);
      return;
    }

    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`,{headers: {
        'User-Agent': 'Mealsdb/1.0'
      }}).then((response) => {
        
      if (response.data.meals) {
        setAllData(response.data.meals);
        setNoFoodFound(false);
      } else {
        setAllData([]);
        setNoFoodFound(true);
      }
    });
  }, [searchQuery]);

  const handleSearchClick = () => {
    searchRecipes(searchQuery);
  };
  return (
    <div className='container'>
      <div className='row'>
        <h1 className='text-white fw-bold fs-1 text-center my-5'>Meals Finder</h1>
        <div className='container'>
  <div className='row'>
    <div className='col-md-6 mx-auto my-5 d-flex'>
      <input
        type="text"
        className="form-control"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className='btn btn-primary mx-2' onClick={handleSearchClick}>
        Search
      </button>
    </div>
  </div>
</div>

        {noFoodFound ? (
          <div className='alert alert-warning my-3 mx-auto' role='alert'>
            No food found for "{searchQuery}".
          </div>
        ) : (
          allData.map((item) => (
            <div className='col-sm-8 col-lg-4' key={item.idMeal}>
              <div className="card shadow-lg m-3" style={{ width: "18rem" }}>
                <div className='card-body'>
                  <img src={item.strMealThumb} className="card-img-top" alt="..." />
                  <p className='card-text'>{item.strMeal}</p>
                  <button
                    type="button"
                    className='btn btn-outline-danger '
                  >
                    <a
                      href={item.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-decoration-none fw-bold text-dark'
                    >
                      Watch Video
                    </a>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Meals;
