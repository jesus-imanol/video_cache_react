
const moviesData = [
    {
      id: 1,
      title: "Kid vs. Kat",
      year: 2008,
      genre: "Comedia, Aventura",
      imageUrl: "https://play-lh.googleusercontent.com/1z_nvBq_lrL5RKKJDmASLdLwqvpI9ZswqxVYtrv1KJG4BDuhka4HPnDd-V9k-PZ6HQSu",
      rating: 4.2,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/El+pegamento+y+Yo+Lamentaras+el+Show+%F0%9F%90%88+Kid+Vs.+Kat+%F0%9F%90%88+Ni%C3%B1o+Vs.+Gato+-+WildBrain.mp4"
    },
    {
      id: 2,
      title: "Kick Buttowski: Suburban Daredevil",
      year: 2010,
      genre: "Acción, Comedia",
      imageUrl: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/51B495FF6FC7BC20BB56E48B0D9208F9A494DDC73C52DABEC62ADDCAB54ECE2E/scale?width=506&aspectRatio=2.00&format=webp",
      rating: 3.8,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/Kick+Buttowski+-+Capitulo+27+(Capitulo+Completo).mp4"
    },
    {
      id: 3,
      title: "Big Hero 6: The Series",
      year: 2017,
      genre: "Acción, Aventura",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BOTc3YTYwNTQtNzNmOC00YTg1LWJiNTgtYWU0ZjgyMzRjNDc2XkEyXkFqcGc@._V1_.jpg",
      rating: 4.4,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/Grandes+H%C3%A9roes+parte+1.mp4"
    },
    {
      id: 4,
      title: "Tuca & Bertie",
      year: 2019,
      genre: "Comedia, Slice of Life",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BYjhhYTBkOWEtODZkMC00NmRjLTkxMTYtMzJhOWQ5ZjYyMzc4XkEyXkFqcGc@._V1_.jpg",
      rating: 3.5,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/Tuca+and+Bertie+Intro+%5BHD%5D.mp4"

    },
    {
      id: 5,
      title: "DuckTales",
      year: 2017,
      genre: "Aventura, Comedia",
      imageUrl: "https://m.media-amazon.com/images/I/91pMfa8EApL._AC_UF894,1000_QL80_.jpg",
      rating: 4.5,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/DuckTales+Theme+Song+DuckTales+%40disneyxd.mp4"
    },
    {
      id: 6,
      title: "The Loud House",
      year: 2016,
      genre: "Comedia, Familiar",
      imageUrl: "https://m.media-amazon.com/images/I/81mWbI6gvnL._AC_UF894,1000_QL80_.jpg",
      rating: 3.7,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/The+Loud+House+Extended+Official+Opening+Theme+Song.mp4"
    },
    {
      id: 7,
      title: "The Owl House",
      year: 2020,
      genre: "Fantasía, Aventura",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMWI2ZWQ3ZWItZjU2My00ZDg0LWIyMDEtNGQ1ZDdlMTVhZTg0XkEyXkFqcGc@._V1_.jpg",
      rating: 4.8,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/The+Owl+House+Theme+Song+%40disneychannel.mp4"
    },
    {
      id: 8,
      title: "Phineas and Ferb",
      year: 2007,
      genre: "Comedia, Aventura",
      imageUrl: "https://images.justwatch.com/poster/317405677/s718/take-two-with-phineas-and-ferb.jpg",
      rating: 4.1,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/%C3%9Altimo+D%C3%ADa+de+Verano+Phineas+y+Ferb.mp4"
    },
    {
      id: 9,
      title: "Hilda",
      year: 2018,
      genre: "Aventura, Fantasía",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BYmI2ZGE3ODQtYzk1ZC00ZDY3LWI3YzItNjhiOGE2OTM3NjVhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      rating: 4.0,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/Hilda+Tr%C3%A1iler+oficial+Netflix.mp4"
    },
    {
      id: 10,
      title: "Carmen Sandiego",
      year: 2019,
      genre: "Acción, Aventura",
      imageUrl: "https://m.media-amazon.com/images/I/517DnBPVx4L.jpg",
      rating: 3.3,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/Carmen+Sandiego+Theme+Song+%5BHD%5D+Netflix+Futures.mp4"
    },
    {
      id: 11,
      title: "We Bare Bears",
      year: 2015,
      genre: "Comedia, Slice of Life",
      imageUrl: "https://i.pinimg.com/736x/e6/7a/d6/e67ad61fa73443e5bcb25bc17c31f063.jpg",
      rating: 3.6,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/Aventura+culinaria+Escandalosos+Cartoon+Network.mp4"
    },
    {
      id: 12,
      title: "Rick and Morty",
      year: 2013,
      genre: "Comedia, Ciencia Ficción",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BZGQyZjk2MzMtMTcyNC00NGU3LTlmNjItNDExMWM4ZDFhYmQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      rating: 4.2,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/Pepinillo+Rick+_+Rick+y+Morty+_+HBO+Max.mp4a"
    },
    {
      id: 13,
      title: "Adventure Time: Distant Lands",
      year: 2020,
      genre: "Fantasía, Aventura",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BZWU0Njc1MzYtNDAzMC00MGZhLThhYTMtNDllYzUxNTMzOGQ0XkEyXkFqcGc@._V1_.jpg",
      rating: 4.5,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/When+Football+Tries+to+Steal+BMO's+Body+Adventure+Time+Cartoon+Network.mp4"
    },
    {
      id: 14,
      title: "Teen Titans Go!",
      year: 2013,
      genre: "Acción, Comedia",
      imageUrl: "https://es.web.img3.acsta.net/c_310_420/pictures/19/07/15/12/05/4007118.jpg",
      rating: 3.0,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/Teen+Titans+Go!+En+Espa%C3%B1ol+Ven+las+Piernas+de+Raven+por+Primera+Vez+DC+Kids.mp4"
    },
    {
      id: 15,
      title: "Bob's Burgers",
      year: 2011,
      genre: "Comedia, Familiar",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BZWQ1NGE4YjgtOGJjZS00OTZjLWI0MGUtMDUxYjY2M2E4MjNjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      rating: 4.2,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/Bobs+Burgers_+Gene+dresses+up+as+Bob.mp4"
    },
    {
      id: 16,
      title: "My Little Pony: Friendship Is Magic",
      year: 2010,
      genre: "Aventura, Fantasía",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BZjhkNzBmMDAtMTBiNy00NGIxLThlN2EtMTJlZDEzZjIzYWUyXkEyXkFqcGc@._V1_.jpg",
      rating: 4.5,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/My+Little+Pony_+friendship+is+magic+Dragonshy+FULL+EPISODE+MLP.mp4"
    },
    {
      id: 17,
      title: "Avatar: The Last Airbender",
      year: 2005,
      genre: "Acción, Aventura",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMDMwMThjYWYtY2Q2OS00OGM2LTlkODQtNDJlZTZmMjAyYmFhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      rating: 5.0,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/Asami+Was+Korra's+FIRST...+Satomobile+Ride+%F0%9F%92%A8+Full+Scene+The+Legend+of+Korra.mp4"
    },
    {
      id: 18,
      title: "The Simpsons",
      year: 1989,
      genre: "Comedia, Familiar",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BNTU2OWE0YWYtMjRlMS00NTUwLWJmZWUtODFhNzJiMGJlMzI3XkEyXkFqcGc@._V1_.jpg",
      rating: 4.0,
      video: "https://spontaneity-2025.s3.us-east-1.amazonaws.com/Simpsons+Intro+HD.mp4"   
    }
  ];
export default moviesData;