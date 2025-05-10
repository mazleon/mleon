import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";

const MLDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use effect to delay rendering until after initial load
  useEffect(() => {
    // Set a timeout to make the component visible after the page has loaded
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Demo options
  const demoOptions = [
    {
      id: "sentiment",
      title: "Sentiment Analysis",
      description: "Analyze the sentiment of text as positive, negative, or neutral.",
      placeholder: "Enter text to analyze sentiment (e.g., 'I love this portfolio website!')"
    },
    {
      id: "image",
      title: "Image Classification",
      description: "Upload an image to classify its contents (simulated).",
      placeholder: "Upload an image to classify"
    }
  ];

  // Function to handle sentiment analysis (simplified demo)
  const analyzeSentiment = (text: string) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Very simple sentiment analysis logic for demo purposes
      const positiveWords = ['good', 'great', 'excellent', 'love', 'amazing', 'happy', 'best'];
      const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'sad', 'poor'];
      
      const words = text.toLowerCase().split(/\s+/);
      let positiveCount = 0;
      let negativeCount = 0;
      
      words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
      });
      
      let sentiment;
      if (positiveCount > negativeCount) {
        sentiment = "Positive 😊";
      } else if (negativeCount > positiveCount) {
        sentiment = "Negative 😞";
      } else {
        sentiment = "Neutral 😐";
      }
      
      setResult(`Sentiment Analysis Result: ${sentiment}`);
      setIsLoading(false);
    }, 1500);
  };

  // Function to handle image classification (simulated)
  const classifyImage = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const possibleClasses = [
        "Cat", "Dog", "Person", "Building", "Nature Scene", 
        "Food", "Vehicle", "Technology", "Art"
      ];
      
      // Randomly select a class for demo purposes
      const randomClass = possibleClasses[Math.floor(Math.random() * possibleClasses.length)];
      const confidence = (Math.random() * 30 + 70).toFixed(2); // Random confidence between 70-100%
      
      setResult(`Classification Result: ${randomClass} (${confidence}% confidence)`);
      setIsLoading(false);
    }, 2000);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (activeDemo === "sentiment") {
      const text = formData.get("text") as string;
      if (text) analyzeSentiment(text);
    } else if (activeDemo === "image") {
      // Simulate image upload
      classifyImage();
    }
  };

  // Don't render anything if not visible yet
  if (!isVisible) {
    return null;
  }
  
  return (
    <section id="ml-demo" className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <SectionHeader title="ML Demos" subtitle="Try out some machine learning models" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {demoOptions.map((demo) => (
            <motion.div
              key={demo.id}
              className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                activeDemo === demo.id 
                  ? "bg-accent-primary bg-opacity-20 border-2 border-accent-primary" 
                  : "bg-primary-light hover:bg-primary-light/80"
              }`}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setActiveDemo(demo.id);
                setResult(null);
              }}
            >
              <h3 className="text-xl font-bold text-secondary mb-2">{demo.title}</h3>
              <p className="text-gray-300 mb-4">{demo.description}</p>
            </motion.div>
          ))}
        </div>

        {activeDemo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 p-6 bg-primary-light rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold text-secondary mb-4">
              {demoOptions.find(d => d.id === activeDemo)?.title}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeDemo === "sentiment" && (
                <div>
                  <textarea
                    name="text"
                    rows={4}
                    className="w-full p-3 bg-primary border border-gray-700 rounded-md text-secondary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
                    placeholder={demoOptions.find(d => d.id === activeDemo)?.placeholder}
                    required
                  />
                </div>
              )}
              
              {activeDemo === "image" && (
                <div className="border-2 border-dashed border-gray-700 rounded-md p-8 text-center">
                  <p className="text-gray-400 mb-4">
                    {demoOptions.find(d => d.id === activeDemo)?.placeholder}
                  </p>
                  <button
                    type="button"
                    onClick={() => classifyImage()}
                    className="px-4 py-2 bg-primary-light border border-gray-700 rounded-md hover:bg-gray-800"
                  >
                    Simulate Image Upload
                  </button>
                </div>
              )}
              
              {activeDemo === "sentiment" && (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-accent-primary text-white rounded-md hover:bg-accent-primary/90 disabled:opacity-50"
                >
                  {isLoading ? "Analyzing..." : "Analyze"}
                </button>
              )}
            </form>
            
            {isLoading && (
              <div className="mt-6 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-primary"></div>
              </div>
            )}
            
            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 p-4 bg-primary rounded-md border border-accent-primary"
              >
                <p className="text-lg font-medium text-secondary">{result}</p>
              </motion.div>
            )}
          </motion.div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Note: These demos are simplified for demonstration purposes and run entirely in your browser.
            <br />
            My actual ML projects use more sophisticated models and algorithms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MLDemo;
