// api/weather.js
export default async function handler(req, res) {
  // Obtener API key de variables de entorno de Vercel
  const API_KEY = process.env.WEATHER_API_KEY;
  
  // Obtener la ciudad del query parameter
  const { city } = req.query;
  
  // Validar que se envió una ciudad
  if (!city) {
    return res.status(400).json({ 
      error: 'City parameter is required' 
    });
  }
  
  try {
    // Llamar a OpenWeatherMap API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
    
    const data = await response.json();
    
    // Si OpenWeatherMap devuelve error
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || 'Weather API error'
      });
    }
    
    // Éxito - devolver datos
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}