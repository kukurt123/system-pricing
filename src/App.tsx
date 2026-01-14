import './App.css'
import AppCard from './components/AppCard'
import Hero from './components/Hero'
import TotalBar from './components/TotalBar'
import { applications } from './data/applications'
import { contact } from './data/contact'
import { useSelections } from './hooks/useSelections'
import { buildQuestionMailto, buildQuoteMailto } from './utils/quote'

function App() {
  const {
    selections,
    updateFeature,
    setAllForApp,
    overallTotal,
  } = useSelections(applications)

  const handleQuoteRequest = () => {
    const mailto = buildQuoteMailto(applications, selections, overallTotal, contact.email)
    window.location.href = mailto
  }

  const handleQuestions = () => {
    const mailto = buildQuestionMailto(applications, selections, contact.email)
    window.location.href = mailto
  }

  return (
    <main className="page">
      <Hero />

      <section className="apps-grid">
        {applications.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            selections={selections}
            onSelectAll={() => setAllForApp(app.id, true)}
            onClearAll={() => setAllForApp(app.id, false)}
            onToggle={(featureId, enabled) => updateFeature(app.id, featureId, enabled)}
          />
        ))}
      </section>

      <TotalBar
        overallTotal={overallTotal}
        onRequest={handleQuoteRequest}
        onQuestions={handleQuestions}
        facebookUrl={contact.facebookUrl}
      />
    </main>
  )
}

export default App
