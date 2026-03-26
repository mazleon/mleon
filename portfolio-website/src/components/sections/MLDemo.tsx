import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import MotionWrapper from "@/components/common/MotionWrapper";

const MLDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const demoOptions = [
    {
      id: "sentiment",
      title: "Sentiment Analysis",
      description:
        "Analyze the sentiment of text as positive, negative, or neutral.",
      placeholder:
        "Enter text to analyze sentiment (e.g., 'I love this portfolio website!')",
    },
    {
      id: "image",
      title: "Image Classification",
      description: "Upload an image to classify its contents (simulated).",
      placeholder: "Upload an image to classify",
    },
  ];

  const analyzeSentiment = (text: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const positiveWords = [
        "good",
        "great",
        "excellent",
        "love",
        "amazing",
        "happy",
        "best",
      ];
      const negativeWords = [
        "bad",
        "terrible",
        "awful",
        "hate",
        "worst",
        "sad",
        "poor",
      ];
      const words = text.toLowerCase().split(/\s+/);
      let pos = 0,
        neg = 0;
      words.forEach((w) => {
        if (positiveWords.includes(w)) pos++;
        if (negativeWords.includes(w)) neg++;
      });
      const sentiment =
        pos > neg ? "Positive" : neg > pos ? "Negative" : "Neutral";
      setResult(`Sentiment: ${sentiment}`);
      setIsLoading(false);
    }, 1500);
  };

  const classifyImage = () => {
    setIsLoading(true);
    setTimeout(() => {
      const classes = [
        "Cat",
        "Dog",
        "Person",
        "Building",
        "Nature Scene",
        "Food",
        "Vehicle",
        "Technology",
        "Art",
      ];
      const cls = classes[Math.floor(Math.random() * classes.length)];
      const conf = (Math.random() * 30 + 70).toFixed(2);
      setResult(`Classification: ${cls} (${conf}% confidence)`);
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (activeDemo === "sentiment") {
      const text = formData.get("text") as string;
      if (text) analyzeSentiment(text);
    } else if (activeDemo === "image") {
      classifyImage();
    }
  };

  if (!isVisible) return null;

  return (
    <section id="ml-demo" className="section bg-surface relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          label="07 — Interactive"
          title="ML Demos"
          subtitle="Try out simplified machine learning models right in your browser"
        />

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {demoOptions.map((demo) => (
              <MotionWrapper key={demo.id} delay={0.1}>
                <div
                  className={`editorial-card cursor-pointer transition-all duration-200 ${
                    activeDemo === demo.id
                      ? "border-accent/50 bg-accent/5"
                      : "hover:border-muted/30"
                  }`}
                  onClick={() => {
                    setActiveDemo(demo.id);
                    setResult(null);
                  }}
                >
                  <h3 className="text-lg font-heading font-bold text-cream mb-2">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-cream-dark font-body">
                    {demo.description}
                  </p>
                </div>
              </MotionWrapper>
            ))}
          </div>

          {activeDemo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="editorial-card"
            >
              <h3 className="text-lg font-heading font-bold text-cream mb-4">
                {demoOptions.find((d) => d.id === activeDemo)?.title}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {activeDemo === "sentiment" && (
                  <textarea
                    name="text"
                    rows={4}
                    className="form-input resize-none"
                    placeholder={
                      demoOptions.find((d) => d.id === activeDemo)?.placeholder
                    }
                    required
                  />
                )}

                {activeDemo === "image" && (
                  <div className="border-2 border-dashed border-surface-light rounded-xl p-8 text-center">
                    <p className="text-sm text-muted mb-4">
                      {
                        demoOptions.find((d) => d.id === activeDemo)
                          ?.placeholder
                      }
                    </p>
                    <button
                      type="button"
                      onClick={classifyImage}
                      className="btn-outline text-sm cursor-pointer"
                    >
                      Simulate Image Upload
                    </button>
                  </div>
                )}

                {activeDemo === "sentiment" && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? "Analyzing..." : "Analyze"}
                  </button>
                )}
              </form>

              {isLoading && (
                <div className="mt-6 flex justify-center">
                  <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-xl"
                >
                  <p className="text-lg font-heading font-medium text-cream">
                    {result}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          <p className="text-xs text-muted text-center mt-8 font-mono">
            These demos are simplified for demonstration purposes and run
            entirely in your browser.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MLDemo;
