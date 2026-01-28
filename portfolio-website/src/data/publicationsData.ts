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
    year: number;
    citations: number;
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
        title: "Predicting COVID-19 infections and deaths in Bangladesh using machine learning algorithms",
        authors: ["Mazharul Islam Leon", "Md Ifraham Iqbal", "Khondaker A. Mamun"],
        venue: "International Journal of Medical Informatics",
        year: 2021,
        citations: 15,
    },
    {
        id: "pub2",
        title: "Implementation of a Digital Healthcare Service Model for Ensuring Preventive and Primary Health Care in Rural Bangladesh",
        authors: ["Mazharul Islam Leon", "Sayed Mehedi Azim", "Amit Ghosh"],
        venue: "IEEE Access",
        year: 2020,
        citations: 7,
    },
    {
        id: "pub3",
        title: "EduBot: an educational robot for underprivileged children",
        authors: ["Mazharul Islam Leon", "Thajid Ibna Rouf Uday", "Khondaker A. Mamun"],
        venue: "International Conference on Robotics and Automation",
        year: 2020,
        citations: 6,
    },
    {
        id: "pub4",
        title: "Deep learning based smart parking for a metropolitan area",
        authors: ["Mazharul Islam Leon", "Md Ifraham Iqbal"],
        venue: "Journal of Intelligent Transportation Systems",
        year: 2021,
        citations: 4,
    },
    {
        id: "pub5",
        title: "Dengue outbreak prediction from weather aware data",
        authors: ["Mazharul Islam Leon", "Amit Ghosh", "Sayed Mehedi Azim"],
        venue: "IEEE Conference on Data Science",
        year: 2019,
        citations: 3,
    },
    {
        id: "pub6",
        title: "Hybrid CNN-LSTM Transfer Learning for Dengue Diagnosis from Raman Spectroscopy Images",
        authors: ["Mazharul Islam Leon", "Khondaker A. Mamun"],
        venue: "Medical Image Analysis Journal",
        year: 2022,
        citations: 1,
    },
];

