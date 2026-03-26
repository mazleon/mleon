export interface ScholarMetrics {
  citations: number;
  hIndex: number;
  i10Index: number;
  profileUrl: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueType: "IEEE" | "Springer" | "Other";
  year: number;
  citations: number;
  problem?: string;
  result?: string;
  url?: string;
}

export const scholarMetrics: ScholarMetrics = {
  citations: 40,
  hIndex: 5,
  i10Index: 3,
  profileUrl: "https://scholar.google.com/citations?user=UsoRY-QAAAAJ&hl=en",
};

// Actual publications from Google Scholar
export const publications: Publication[] = [
  {
    id: "pub1",
    title:
      "Dengue Outbreak Prediction from the Weather Spatiotemporal data using Deep Learning",
    authors: [
      "Mazharul Islam Leon",
      "Md Ifraham Iqbal",
      "Sadaf Meem",
      "Furkhan Alahi",
      "Morshed Ahmed",
      "Md. Saddam Hossain Mukta",
    ],
    venue: "ICBBDB",
    venueType: "Springer",
    year: 2021,
    citations: 15,
    problem:
      "Predict dengue outbreaks 4 weeks ahead using multi-city weather data.",
    result:
      "Outperformed ARIMA and LSTM baselines with spatiotemporal deep learning.",
  },
  {
    id: "pub2",
    title:
      "Predicting COVID-19 infections and deaths in Bangladesh using Machine Learning Algorithms",
    authors: [
      "Mazharul Islam Leon",
      "Md Ifraham Iqbal",
      "Sayed Mehedi Azim",
      "Khondaker A. Mamun",
    ],
    venue: "ICICT4SD",
    venueType: "IEEE",
    year: 2021,
    citations: 7,
    problem:
      "Forecasting the transmission dynamics of COVID-19 in a densely populated region.",
    result:
      "Identified key predictive markers to assist in epidemiological planning.",
  },
  {
    id: "pub3",
    title:
      "Implementation of a Digital Healthcare Service Model for Ensuring Preventive and Primary Health Care in Rural Bangladesh",
    authors: [
      "Khondaker A. Mamun",
      "Moinul H. Chowdhury",
      "Rubaiyat Alam Hridhe",
      "Tanvir Islam",
      "Mazharul Islam Leon",
      "Mithila Faruque",
      "Mohammad Badruddozza Mia",
      "Md Jasim Uddin",
      "Farhana Sarker",
    ],
    venue: "IC4IR",
    venueType: "Springer",
    year: 2021,
    citations: 6,
    problem:
      "Lack of continuous primary care infrastructure in rural contexts.",
    result:
      "Deployed a decentralized digital healthcare model bridging rural patients with urban specialists.",
  },
  {
    id: "pub4",
    title:
      "Deep Learning Based Smart Parking Management System For Metropolitan City",
    authors: [
      "Md Ifraham Iqbal",
      "Mazharul Islam Leon",
      "Jahidul Islam Rahat",
      "Nilamber Haider Tonmoy",
      "Amit Ghosh",
    ],
    venue: "Tensymp",
    venueType: "IEEE",
    year: 2021,
    citations: 4,
    problem: "Urban congestion exacerbated by inefficient parking allocation.",
    result:
      "Smart CV-based parking tracking reducing search time via automated allocation.",
  },
  {
    id: "pub5",
    title: "EduBot: An Educational Robot for Underprivileged Children",
    authors: [
      "Afnan Islam",
      "Thajid Ibna Rouf Uday",
      "Nazib Ahmad",
      "Md Toriqul Islam",
      "Amit Ghosh",
      "Sadia Kamal",
      "Tanzir Ahommed",
      "Mazharul Islam Leon",
      "Ehsan Ahmed Dhrubo",
    ],
    venue: "ICACTM",
    venueType: "IEEE",
    year: 2019,
    citations: 3,
    problem:
      "Limited access to interactive educational resources for marginalized children.",
    result:
      "Low-cost robotic learning companion delivering localized educational content.",
  },
  {
    id: "pub6",
    title:
      "Hybrid CNN-LSTM Transfer Learning for Dengue Diagnosis from Raman Spectroscopy Images",
    authors: [
      "Syed Ahmed",
      "Mazharul Islam Leon",
      "Sanchita Pal",
      "M. Rubaiyat Hossain Mondal",
    ],
    venue: "ICTP",
    venueType: "IEEE",
    year: 2023,
    citations: 1,
    problem:
      "Rapid, non-invasive early diagnosis of Dengue using spectral imaging.",
    result:
      "Achieved superior sensitivity compared to standard rapid diagnostic tests using CNN-LSTM features.",
  },
];
