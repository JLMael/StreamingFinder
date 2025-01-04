import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { FaSun, FaMoon } from "react-icons/fa";

import SuggestionForm from "./SuggestionForm";

const getScreenshotUrl = (url) => {
  return `https://api.urlbox.io/v1/RPlxApG0kQQ6UiAm/png?url=${encodeURIComponent(
    url
  )}&width=800&block_ads=true`;
};

const sites = [
  {
    name: "FilmoFlix",
    image: getScreenshotUrl("https://filmoflix.ad/"),
    description: "VOSTFR/VF uBlock fonctionne.",
    type: "Film, Série, Anime",
    links: [{ label: "Visiter FilmoFlix", url: "https://filmoflix.ad/" }],
  },
  {
    name: "Top Stream",
    image: getScreenshotUrl("https://top-stream.tv/"),
    description: "VOSTFR/VF uBlock fonctionne et conseillé.",
    type: "Film, Série, Anime",
    links: [{ label: "Visiter Top Stream", url: "https://top-stream.tv/" }],
  },
  {
    name: "Soap2Day",
    image: getScreenshotUrl("https://ww25.soap2day.day/"),
    description: "VO/VOSTFR uBlock fonctionne.",
    type: "Film, Série",
    links: [{ label: "Visiter Soap2Day", url: "https://ww25.soap2day.day/" }],
  },

  {
    name: "Wiflix HD",
    image: getScreenshotUrl("https://wiflix-hd.store/"),
    description: "VF/VOSTFR uBlock fonctionne.",
    type: "Film, Série",
    links: [
      { label: "Visiter WiflixHub", url: "https://wiflix.name/" },
      { label: "Visiter Wiflix-HD", url: "https://wiflix-hd.store/" },
    ],
  },
  {
    name: "Lokarn",
    image: getScreenshotUrl("https://www.lokarn.net/films"),
    description: "VF/VOSTFR uBlock fonctionne.",
    type: "Film, Série",
    links: [{ label: "Visiter Lokarn", url: "https://www.lokarn.net/films" }],
  },
  {
    name: "Gogoflix",
    image: getScreenshotUrl("https://gogoflix.space/"),
    description: "VF/VOSTFR uBlock fonctionne.",
    type: "Film, Série",
    links: [{ label: "Visiter Gogoflix", url: "https://gogoflix.space/" }],
  },
  {
    name: "Vogfo",
    image: getScreenshotUrl("https://vogfo.com/kp6vx7yqukgh7/home/vogfo/"),
    description:
      "VF/VOSTFR uBlock fonctionne, film d'animation uniquement. Le site ferme parfois afin de récolter des dons.",
    type: "Film, Anime",
    links: [
      {
        label: "Visiter Vogfo",
        url: "https://vogfo.com/kp6vx7yqukgh7/home/vogfo/",
      },
      {
        label: "Visiter Pigraz",
        url: "https://www.pigraz.com/8ajlyll5ccv9o/home/pigraz",
      },
      {
        label: "Visiter Vredap",
        url: "https://www.vredap.com/51bpuyl61bv0up8/home/vredap",
      },
    ],
  },
  {
    name: "PapaDuStream v2",
    image: getScreenshotUrl("https://papadustream.vc/"),
    description: "VF/VOSTFR uBlock fonctionne, série et animation uniquement",
    type: "Série, Anime",
    links: [
      { label: "Visiter PapaDuStream v2", url: "https://papadustream.vc/" },
    ],
  },
  {
    name: "Senpai Stream",
    image: getScreenshotUrl("https://senpai-stream.net/"),
    description: "VF/VOSTFR uBlock fonctionne et conseillé.",
    type: "Série, Film, Anime",
    links: [
      { label: "Visiter Senpai Stream", url: "https://senpai-stream.net/" },
    ],
  },
  {
    name: "Mavanimes",
    image: getScreenshotUrl("https://www.mavanimes.co/"),
    description:
      "VOSTFR/VF uBlock fonctionne, à jours sur les animes de saison.",
    type: "Anime",
    links: [{ label: "Visiter Mavanimes", url: "https://www.mavanimes.co/" }],
  },
  {
    name: "French Anime",
    image: getScreenshotUrl("https://french-anime.com/"),
    description:
      "VOSTFR/VF uBlock fonctionne, à jours sur les animes de saison.",
    type: "Anime",
    links: [
      { label: "Visiter French Anime", url: "https://french-anime.com/" },
    ],
  },
  {
    name: "VoirAnime",
    image: getScreenshotUrl("https://ww1.voiranime.homes/"),
    description:
      "VOSTFR/VF uBlock fonctionne, à jours sur les animes de saison.",
    type: "Anime",
    links: [
      { label: "Visiter VoirAnime", url: "https://ww1.voiranime.homes/" },
    ],
  },
  {
    name: "Anime-Sama",
    image: getScreenshotUrl("https://anime-sama.fr/"),
    description:
      "VOSTFR/VF uBlock fonctionne, à jours sur les animes de saison.",
    type: "Anime",
    links: [
      { label: "Visiter Anime-Sama.fr", url: "https://anime-sama.fr/" },
      {
        label: "Visiter Anime-Sama.to",
        url: "https://anime-sama.to/",
      },
    ],
  },
  {
    name: "Neko-Sama",
    image: getScreenshotUrl("https://www.neko-sama.org/"),
    description: "VOSTFR/VF uBlock fonctionne.",
    type: "Anime",
    links: [{ label: "Visiter Neko Sama", url: "https://www.neko-sama.org/" }],
  },
  {
    name: "Sekai-One",
    image: getScreenshotUrl("https://sekai.one/"),
    description: "VOSTFR/VF uBlock fonctionne. Tous les classiques et KAI.",
    type: "Anime",
    links: [{ label: "Visiter Sekai One", url: "https://sekai.one/" }],
  },
  {
    name: "Anime Ultra",
    image: getScreenshotUrl("https://v6.animesultra.net/"),
    description:
      "VOSTFR/VF uBlock fonctionne, à jours sur les animes de saison.",
    type: "Anime",
    links: [
      { label: "Visiter Anime Ultra", url: "https://v6.animesultra.net/" },
    ],
  },
  {
    name: "Cartoon Hub",
    image: getScreenshotUrl("https://catoonhub.com/"),
    description:
      "VOSTFR/VF Attention aux bloqueurs de pub trop aggressif, dessin animés, le site ferme fréquemment afin de récolter des dons.",
    type: "Anime",
    links: [{ label: "Visiter Cartoon Hub", url: "https://catoonhub.com/" }],
  },
  {
    name: "OxTorrent",
    image: getScreenshotUrl("www.oxtorrent.gy"),
    description: "Site de Torrent divers et variés.",
    type: "Torrent",
    links: [{ label: "Visiter OxTorrent", url: "www.oxtorrent.gy" }],
  },
  {
    name: "DPStream",
    image: getScreenshotUrl("https://www.dpstream.bar/"),
    description: "VF uniquement. uBlock fonctionne.",
    type: "Série,Film,Anime",
    links: [{ label: "Visiter DPStream", url: "https://www.dpstream.bar/" }],
  },
  {
    name: "Wawacity",
    image: getScreenshotUrl("https://www.wawacity.tools/"),
    description: "Site de Torrent divers et variés.",
    type: "Torrent",
    links: [{ label: "Visiter Wawacity", url: "https://www.wawacity.tools/" }],
  },
  {
    name: "Empire Streaming",
    image: getScreenshotUrl("https://empire-streaming.store/"),
    description: "VF/VOSTFR uBlock fonctionne.",
    type: "Série, Film, Anime",
    links: [
      {
        label: "Visiter Empire Streaming",
        url: "https://empire-streaming.store/",
      },
    ],
  },
  {
    name: "Mon Stream",
    image: getScreenshotUrl("https://monstream.click/"),
    description: "VF/VOSTFR uBlock fonctionne.",
    type: "Série, Film, Anime",
    links: [
      {
        label: "Visiter Mon Stream",
        url: "https://monstream.click/",
      },
    ],
  },
  {
    name: "French Stream",
    image: getScreenshotUrl("https://french-stream.gratis/"),
    description: "VF/VOSTFR uBlock fonctionne.",
    type: "Série, Film, Anime",
    links: [
      {
        label: "Visiter French Stream",
        url: "https://french-stream.gratis/",
      },
    ],
  },
  {
    name: "Just Stream",
    image: getScreenshotUrl("https://juststream.now/"),
    description: "VF/VOSTFR uBlock fonctionne.",
    type: "Série, Film, Anime",
    links: [
      {
        label: "Visiter Just Stream",
        url: "https://juststream.now/",
      },
    ],
  },
  {
    name: "C Pas Bien",
    image: getScreenshotUrl("https://www.cpasbien.cv/"),
    description: "Site de Torrent divers et variés.",
    type: "Torrent",
    links: [
      {
        label: "Visiter C Pas Bien",
        url: "https://www.cpasbien.cv/",
      },
    ],
  },
  {
    name: "WookaFR",
    image: getScreenshotUrl("https://wookafr.plus/"),
    description: "VF uBlock fonctionne.",
    type: "Série, Film",
    links: [
      {
        label: "Visiter WookaFR",
        url: "https://wookafr.plus/",
      },
    ],
  },
  {
    name: "YGGTorrent",
    image: getScreenshotUrl("https://www.yggtorrent.in/"),
    description: "Site de Torrent divers et variés.",
    type: "Torrent",
    links: [
      {
        label: "Visiter YGGTorrent",
        url: "https://www.yggtorrent.in/",
      },
    ],
  },
  {
    name: "The Pirate Bay",
    image: getScreenshotUrl("https://ww2.thepiratebay3.co/"),
    description: "Site de Torrent historique.",
    type: "Torrent",
    links: [
      {
        label: "Visiter Pirabay HUB",
        url: "https://piratebayproxy.net/",
      },
      {
        label: "Visiter Piratebay",
        url: "https://ww2.thepiratebay3.co/",
      },
    ],
  },
  {
    name: "Torrent9",
    image: getScreenshotUrl("https://www.torrent9.ke/"),
    description: "Site de Torrent divers et variés.",
    type: "Torrent",
    links: [
      {
        label: "Visiter Torrent9",
        url: "https://www.torrent9.ke/",
      },
    ],
  },
  {
    name: "Coflix",
    image: getScreenshotUrl("https://coflix.app/"),
    description: "VF/VOSTFR uBlock fonctionne.",
    type: "Série, Film, Anime",
    links: [
      {
        label: "Visiter Coflix",
        url: "https://coflix.app/",
      },
    ],
  },
  {
    name: "Zone Telechargement",
    image: getScreenshotUrl("https://www.zone-telechargement.tools/"),
    description: "Site de Torrent divers et variés.",
    type: "Torrent",
    links: [
      {
        label: "Visiter Zone Telechargement",
        url: "https://www.zone-telechargement.tools/",
      },
    ],
  },
  {
    name: "Tirexo",
    image: getScreenshotUrl("https://www.tirexo.tools/"),
    description: "Site de téléchargement Torrent ou autre.",
    type: "Torrent",
    links: [
      {
        label: "Visiter Tirexo",
        url: "https://www.tirexo.tools/",
      },
    ],
  },
  {
    name: "Stream Complet",
    image: getScreenshotUrl("https://www.streamcomplet.al/"),
    description: "VF site de streaming de vieux films.",
    type: "Série, Film",
    links: [
      {
        label: "Visiter Stream Complet",
        url: "https://www.streamcomplet.al/",
      },
    ],
  },
  {
    name: "Darkiworld",
    image: getScreenshotUrl("https://darkiworld.biz/"),
    description: "VF/VOSTFR uBlock fonctionne",
    type: "Série, Film",
    links: [
      {
        label: "Visiter Darkiworld",
        url: "https://darkiworld.biz/",
      },
    ],
  },
  {
    name: "Sport Tuna Pro",
    image: getScreenshotUrl("https://live.sporttuna.pro/"),
    description: "Site de streaming de sport.",
    type: "Sport",
    links: [
      {
        label: "Visiter Sport Tuna PRO",
        url: "https://live.sporttuna.pro/",
      },
    ],
  },
  // {
  //   name: "",
  //   image: getScreenshotUrl(""),
  //   description: "",
  //   type: "Série, Film, Anime",
  //   links: [
  //     {
  //       label: "Visiter",
  //       url: "",
  //     },
  //   ],
  // },
  // {
  //   name: "",
  //   image: getScreenshotUrl(""),
  //   description: "",
  //   type: "Série, Film, Anime",
  //   links: [
  //     {
  //       label: "Visiter",
  //       url: "",
  //     },
  //   ],
  // },
  // {
  //   name: "",
  //   image: getScreenshotUrl(""),
  //   description: "",
  //   type: "Série, Film, Anime",
  //   links: [
  //     {
  //       label: "Visiter",
  //       url: "",
  //     },
  //   ],
  // },
  // {
  //   name: "",
  //   image: getScreenshotUrl(""),
  //   description: "",
  //   type: "Série, Film, Anime",
  //   links: [
  //     {
  //       label: "Visiter",
  //       url: "",
  //     },
  //   ],
  // },
  // {
  //   name: "",
  //   image: getScreenshotUrl(""),
  //   description: "",
  //   type: "Série, Film, Anime",
  //   links: [
  //     {
  //       label: "Visiter",
  //       url: "",
  //     },
  //   ],
  // },
  // {
  //   name: "",
  //   image: getScreenshotUrl(""),
  //   description: "",
  //   type: "Série, Film, Anime",
  //   links: [
  //     {
  //       label: "Visiter",
  //       url: "",
  //     },
  //   ],
  // },
  // Ajoute ici d'autres sites avec des liens multiples si nécessaire
];
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

function App() {
  const [hoveredSite, setHoveredSite] = useState(null);
  const [modalSite, setModalSite] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [filterType, setFilterType] = useState(""); // État pour le filtre de type

  const [isSuggestionFormOpen, setIsSuggestionFormOpen] = useState(false);

  // Ref for modal to detect clicks outside
  const modalRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Close modal if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalSite(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredSites = sites.filter((site) => {
    // Filtrer les sites en fonction du type
    if (!filterType) return true; // Si aucun filtre, on garde tous les sites
    return site.type.toLowerCase().includes(filterType.toLowerCase());
  });

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-[#FAF9F6] text-black"
      }`}
    >
      <div className="App p-4">
        {/* Conteneur Flex pour le bouton et le filtre */}
        <div className="flex justify-between items-center mb-4">
          {/* Bouton pour changer de thème */}
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 flex items-center"
          >
            {darkMode ? (
              <FaSun className="mr-2" />
            ) : (
              <FaMoon className="mr-2" />
            )}
            {darkMode ? "Mode Clair" : "Mode Sombre"}
          </button>
          <button
            onClick={() => setIsSuggestionFormOpen(true)}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700"
          >
            Suggérer un site
          </button>
          {/* Filtre par type */}
          <div className="flex items-center">
            <label className={`mr-2 ${darkMode ? "text-white" : "text-black"}`}>
              Filtrer par type :
            </label>
            <select
              onChange={(e) => setFilterType(e.target.value)}
              value={filterType}
              className={`p-2 border rounded ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <option value="">Tous</option>
              <option value="Film">Film</option>
              <option value="Série">Série</option>
              <option value="Anime">Anime</option>
              <option value="Torrent">Torrent</option>
              <option value="Sport">Sport</option>
              <option value="+18">+18</option>
            </select>
          </div>
        </div>

        {/* Message d'accueil */}
        <div className="text-center mb-4">
          <h1
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Listes des sites actuellement répertoriés
          </h1>
        </div>

        <div className={modalSite ? "filter blur-sm" : ""}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredSites.map((site, index) => (
              <button
                key={index}
                className="relative bg-blue-500 text-white p-4 rounded hover:bg-blue-700"
                onMouseEnter={() => setHoveredSite(site)}
                onMouseLeave={() => setHoveredSite(null)}
                onClick={() => setModalSite(site)}
              >
                {site.name}
              </button>
            ))}
          </div>
        </div>

        {/* Prévisualisation générale */}
        {hoveredSite && !modalSite && (
          <div className="fixed bottom-10 right-10 bg-white text-black p-4 shadow-lg rounded w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px]">
            <img
              src={hoveredSite.image}
              alt={hoveredSite.name}
              className="w-full h-auto object-cover mb-2 rounded"
            />
            <p className="text-sm">{hoveredSite.description}</p>
          </div>
        )}

        {/* Pop-up avec prévisualisation de lien */}
        {modalSite && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div
              ref={modalRef} // Attache la ref au modal
              className={`p-6 rounded shadow-lg w-96 ${
                darkMode ? "bg-gray-800 text-white" : "bg-[#FAF9F6] text-black"
              }`}
            >
              <h2 className="text-xl font-bold mb-4">{modalSite.name}</h2>
              <p>{modalSite.description}</p>
              <div className="mt-4 space-y-2">
                {modalSite.links.map((link, index) => (
                  <div key={index} className="relative">
                    <button
                      onMouseEnter={() => setHoveredLink(link)} // Survol du lien
                      onMouseLeave={() => setHoveredLink(null)} // Quitter le survol
                      onClick={() => window.open(link.url, "_blank")}
                      className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      {link.label}
                    </button>

                    {/* Affichage de la prévisualisation du lien survolé */}
                    {hoveredLink === link && (
                      <div className="absolute top-0 left-full ml-2 bg-white text-black p-4 shadow-lg rounded w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px]">
                        <img
                          src={getScreenshotUrl(link.url)} // Prévisualisation de l'URL du lien
                          alt={link.label}
                          className="w-full h-auto object-cover mb-2 rounded"
                        />
                        <p className="text-sm">{modalSite.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setModalSite(null)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
      <SuggestionForm
        isOpen={isSuggestionFormOpen}
        onClose={() => setIsSuggestionFormOpen(false)}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
