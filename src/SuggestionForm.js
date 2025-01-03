import React, { useState, useRef } from "react";

const SuggestionForm = ({ isOpen, onClose, darkMode }) => {
  const [formData, setFormData] = useState({
    siteName: "",
    siteUrl: "",
    description: "",
    types: {
      Film: false,
      Série: false,
      Anime: false,
      Torrent: false,
      Sport: false,
      18: false,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Convertir les types sélectionnés en string
    const selectedTypes = Object.entries(formData.types)
      .filter(([_, selected]) => selected)
      .map(([type]) => type)
      .join(", ");

    if (selectedTypes.length === 0) {
      setSubmitStatus("error-type");
      setIsSubmitting(false);
      return;
    }

    // Remplacez VOTRE_URL_WEBHOOK par votre véritable URL webhook Discord
    const webhookUrl =
      "https://discord.com/api/webhooks/1324612885065760880/i41y9kP7mO88NphfhWniviqvdf218zTlasboT0RYyv7uCeMc9hOnHLJ1m6-flCbhUE9a";

    const message = {
      embeds: [
        {
          title: "Nouvelle suggestion de site",
          color: 3447003,
          fields: [
            {
              name: "Nom du site",
              value: formData.siteName,
            },
            {
              name: "URL",
              value: formData.siteUrl,
            },
            {
              name: "Description",
              value: formData.description,
            },
            {
              name: "Types de contenu",
              value: selectedTypes,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
          setFormData({
            siteName: "",
            siteUrl: "",
            description: "",
            types: {
              Film: false,
              Série: false,
              Anime: false,
              Torrent: false,
              Sport: false,
              18: false,
            },
          });
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTypeChange = (type) => {
    setFormData({
      ...formData,
      types: {
        ...formData.types,
        [type]: !formData.types[type],
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className={`p-6 rounded-lg shadow-xl w-96 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Suggérer un site</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Nom du site</label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) =>
                  setFormData({ ...formData, siteName: e.target.value })
                }
                className={`w-full p-2 rounded border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label className="block mb-1">URL du site</label>
              <input
                type="url"
                value={formData.siteUrl}
                onChange={(e) =>
                  setFormData({ ...formData, siteUrl: e.target.value })
                }
                className={`w-full p-2 rounded border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`w-full p-2 rounded border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block mb-2">
                Types de contenu (sélectionnez au moins un)
              </label>
              <div className="space-y-2">
                {Object.keys(formData.types).map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type}
                      checked={formData.types[type]}
                      onChange={() => handleTypeChange(type)}
                      className="mr-2"
                    />
                    <label htmlFor={type}>{type}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded text-white ${
                isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSubmitting ? "Envoi..." : "Envoyer"}
            </button>
          </div>

          {submitStatus && (
            <div
              className={`mt-4 p-2 rounded text-center ${
                submitStatus === "success"
                  ? "bg-green-100 text-green-700"
                  : submitStatus === "error-type"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {submitStatus === "success"
                ? "Suggestion envoyée avec succès !"
                : submitStatus === "error-type"
                ? "Veuillez sélectionner au moins un type de contenu"
                : "Erreur lors de l'envoi. Veuillez réessayer."}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SuggestionForm;
