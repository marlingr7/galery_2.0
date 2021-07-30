async function getGifs(name) {
  let urlInitial =
    "https://api.giphy.com/v1/gifs/search?api_key=g8dBw4OTVzo50XvTEhgxPZImzQBOggmK&q=";
  let urlFinal = "&limit=10&offset=0&rating=g&lang=en";
  let url = urlInitial + name + urlFinal;

  try {
    let response = await fetch(url);
    let json = await response.json();
    return json;
  } catch (err) {
    return alert(err);
  }
}
