const configGaroua = {
  nom: "Garoua",
  urlCSV: "",
  bareme: function(km) {
    if (km <= 2.5) return { moto: 100, taxi: 100 };
    if (km <= 5.5) return { moto: 200, taxi: 200 };
    if (km <= 8.0) return { moto: 300, taxi: 300 };
    if (km <= 10.5) return { moto: 400, taxi: 400 };
    if (km <= 15.8) return { moto: 500, taxi: 500 };
    if (km <= 18.0) return { moto: 600, taxi: 600 };
    if (km <= 23.0) return { moto: 700, taxi: 750 };
    if (km <= 28.0) return { moto: 850, taxi: 900 };
    if (km <= 34.0) return { moto: 1000, taxi: 1050 };
    if (km <= 40.0) return { moto: 1150, taxi: 1200 };
    if (km <= 45.0) return { moto: 1300, taxi: 1350 };
    return { moto: 1500, taxi: 1500 };
  },
  lieux: {
    "pont sur la bénoué (entrée sud)": { lat: 9.2889, lon: 13.4019, axe: true },
    "aéroport international de garoua (yelwa)": { lat: 9.3358, lon: 13.3701, axe: true },
    "rond-point plateau (centre-ville)": { lat: 9.3015, lon: 13.3935, axe: true }
    // ... [Extrait du code de configuration pour Garoua]
  }
};
