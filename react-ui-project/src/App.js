import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [selectedArtwork, setSelectedArtwork] = useState([])
  const [searchTerm, setSearchTerm] = useState("french")

  const fetchArt = () => {
    fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&fields=id,title,artist_display,date_display,main_reference_number,image_id`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedArtwork(data.data)
        setSearchTerm("")
      })
  }

  useEffect(() => {
    fetchArt()
  }, []);

  return (
    <div>
      <div>
        <input type="text" onChange={(e)=> setSearchTerm(e.target.value)} value={searchTerm}/>
        <button onClick={fetchArt}>Search</button>
      </div>
      <div>
        {
          selectedArtwork.map((artwork)=>(
            <div key={artwork.id}>
              <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`} />
            </div>
          ))
        }
      </div>
    </div>
    
  );
}

export default App;
