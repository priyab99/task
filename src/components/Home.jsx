import  { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://api.punkapi.com/v2/beers';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1 className='text-center text-lg font-semibold mt-5 mb-5'>API Data</h1>
      <div className='grid grid-cols-1 justify-center place-items-center'>
        {data.map(item => (
          <div key={item.id} className='card w-96 bg-base-100 shadow-xl m-4'>
            <figure>
              <img src={item.image_url} alt={item.name}  className=' object-cover w-full' />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>{item.name}</h2>
              <p>{item.description}</p>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
