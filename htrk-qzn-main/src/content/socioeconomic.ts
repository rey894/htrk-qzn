// Socioeconomic profile data for Quezon, Bukidnon
export const socioeconomicProfile = {
  economicStatus: {
    title: "Economic Status",
    incomeClass: "1st Class Municipality",
    classification: "Classified under Republic Act No. 11964, for municipalities with an average annual regular income of more than ₱200 million",
    annualRevenue2024: "₱625,230,656.43",
    mainIndustries: "Agriculture-driven economy, with sugarcane (BUSCO) and pineapple (Del Monte Philippines) as leading cash crops. The economy is also sustained by a thriving livestock sector, vegetable industry, and a rapidly expanding business sector."
  },
  
  geography: {
    title: "Geographical Profile",
    classification: "1st Class Municipality",
    landArea: "71,128 hectares (711.28 sq. km)",
    location: "Southern Bukidnon Province",
    distances: {
      malaybalay: "75 km from Provincial Center (Malaybalay City)",
      davao: "145 km from Davao City (Urban Center)",
      cdo: "162 km from Cagayan de Oro City (Regional Center)"
    },
    borders: {
      south: "Municipality of Kitaotao",
      east: "Municipality of San Fernando",
      north: "City of Valencia",
      west: "Municipality of Maramag"
    },
    landClassification: {
      forestland: "50,250 hectares (70.66%)",
      alienable: "20,878 hectares (29.34%)"
    },
    barangays: 31,
    entryPoints: [
      {
        direction: "South",
        route: "Palacapao via Kipolot"
      },
      {
        direction: "West",
        route: "San Jose via Brgy. Camp 1, Maramag"
      },
      {
        direction: "North",
        route: "Butong via Dologon, Maramag (Dologon-Busco-Quezon Road)"
      }
    ]
  },
  
  demographics: {
    title: "Population Demographics (PSA 2024 Census)",
    totalPopulation: "114,152",
    urbanPopulation: "56%",
    urbanBarangays: ["Poblacion", "Butong", "Salawagan", "San Jose", "Kiburiao", "Puntian", "Mibantang", "Libertad"],
    youthPercentage: "62% under the age of 30",
    description: "A predominantly young municipality with a majority of residents under 30 years of age, representing significant potential for growth and development."
  }
};
