import HeroSection from '../components/hero/HeroSection'
import OurTeam from '../components/our-team/OurTeam'
import OurPracticeAreas from '../components/practice-areas/OurPracticeAreas'
import SharedValues from '../components/shared-values/SharedValues'
import ParallaxSection from '../components/parallax-section/ParallaxSection'
import AboutSection from '../components/who-we-are/AboutSection'

export default function LandingPage() {
    return (
        <div>
            <HeroSection />
            <AboutSection />
            <SharedValues />
            <OurPracticeAreas />
            <OurTeam />
            <ParallaxSection />
        </div>
    )
}
