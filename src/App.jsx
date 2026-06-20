import VideoIntro from './components/VideoIntro.jsx';
import ProofVault from './components/ProofVault.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import ProofStrip from './components/ProofStrip.jsx';
import Contact from './components/Contact.jsx';
import './styles/global.css';
import './styles/app.css';

export default function App() {
  return (
    <main>
      <VideoIntro />
      <ProofVault />
      <About />
      <Projects />
      <Skills />
      <ProofStrip />
      <Contact />
    </main>
  );
}
