import SectionHeader from "../ui/SectionHeader";
import MotionWrapper from "@/components/common/MotionWrapper";

const interests = [
  {
    title: "Trustworthy RAG Evaluation",
    description:
      "Standard RAGAS metrics (faithfulness, context precision) measure retrieval quality but fail to capture user trust erosion in production deployments. I observed this pattern first-hand at RedDot — a system scoring 0.91 on RAGAS faithfulness still generated responses users flagged as 'unhelpful' at a 23% rate. I want to develop evaluation frameworks that bridge this gap between automated metrics and real-world reliability.",
  },
  {
    title: "Edge-Optimised Vision-Language Models",
    description:
      "Vision-language models like LLaVA and Florence-2 currently require cloud-scale compute. My production experience deploying YOLO v12 at <50ms on NVIDIA Jetson Orin suggests that architectural insights from edge-optimised detection can be applied to multimodal reasoning. I'm interested in closing the gap between VLM capability and edge deployment viability.",
  },
  {
    title: "Production-Scale Biometric AI Robustness",
    description:
      "eKYC systems serving tens of millions of users encounter distribution shifts (lighting, document quality, demographic variation) that laboratory evaluation does not capture. I want to study continual learning approaches that allow biometric models to maintain calibrated confidence under these shifts without requiring full retraining cycles.",
  },
];

const ResearchInterests = () => {
  return (
    <section id="research-interests" className="section bg-surface relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          label="03.5 — Research Focus"
          title="Research Interests"
          subtitle="Key problem areas I'm actively exploring and targeting for graduate research."
        />
        <div className="max-w-4xl mx-auto space-y-6">
          {interests.map((interest, idx) => (
            <MotionWrapper key={idx} delay={0.2 + idx * 0.1}>
              <div className="editorial-card p-8 bg-surface-light/30 border border-surface-light rounded-2xl hover:border-accent/40 transition-colors">
                <h3 className="text-xl font-heading font-bold text-cream mb-4">
                  {interest.title}
                </h3>
                <p className="text-cream-dark font-body leading-relaxed">
                  {interest.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchInterests;
