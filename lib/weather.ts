export async function getWeather(
  lat: number,
  lng: number
) {
  const apiKey =
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
  );

  return response.json();
}