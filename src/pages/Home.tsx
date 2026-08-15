import { Hero } from "@components/common/Hero/Hero";
import { HeroBanner } from "@components/home/HeroBanner";
import { MentorSection } from "@components/home/MentorSection";
import VideoLearning from "@components/home/VideoLearning";

 const Home = () => {
  return (
    <>
      <Hero />
      <VideoLearning />
      <HeroBanner />
      <MentorSection />
    </>
  );
};

export default Home;
