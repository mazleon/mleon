import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = "Mazharul Islam Leon | Senior Software Engineer",
    description = "Mazharul Islam Leon - Senior Software Engineer specializing in Machine Learning and AI solutions with over 5 years of experience in the industry and research field.",
    keywords = ["Mazharul Islam Leon", "Machine Learning Engineer", "AI Engineer", "Deep Learning", "Computer Vision", "NLP", "Portfolio"],
    image = "/images/Leon_Profile_Image.JPG",
    url = "https://mazleon.com",
}) => {
    const siteTitle = title.includes("Mazharul") ? title : `${title} | Mazharul Islam Leon`;

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(", ")} />

            {/* Open Graph / Social Media */}
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
