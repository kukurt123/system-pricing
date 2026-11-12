import './App.css'
import AppCard from './components/AppCard'
import Hero from './components/Hero'
import TotalBar from './components/TotalBar'
import { applications } from './data/applications'
import { contact } from './data/contact'
import { useSelections } from './hooks/useSelections'
import { buildDemoMailto, buildQuestionMailto, buildQuoteMailto } from './utils/quote'

function App() {
  const {
    selections,
    updateFeature,
    setAllForApp,
    setPackageForApp,
    appQuotes,
    overallTotal,
    overallSubtotal,
    overallDiscount,
  } = useSelections(applications)

  const handleQuoteRequest = () => {
    const mailto = buildQuoteMailto(applications, selections, appQuotes, contact.email)
    window.location.href = mailto
  }

  const handleQuestions = () => {
    const mailto = buildQuestionMailto(applications, selections, contact.email)
    window.location.href = mailto
  }

  const handleDemoRequest = () => {
    const mailto = buildDemoMailto(applications, selections, contact.email)
    window.location.href = mailto
  }

  return (
    <main className="page">
      <Hero />

      <section className="apps-grid" id="pricing">
        {applications.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            selections={selections}
            quote={appQuotes[app.id]}
            onSelectPremium={() => setPackageForApp(app.id, 'premium')}
            onSelectStandard={() => setPackageForApp(app.id, 'standard')}
            onClearAll={() => setAllForApp(app.id, false)}
            onToggle={(featureId, enabled) => updateFeature(app.id, featureId, enabled)}
          />
        ))}
      </section>

      <TotalBar
        overallTotal={overallTotal}
        overallSubtotal={overallSubtotal}
        overallDiscount={overallDiscount}
        onRequest={handleQuoteRequest}
        onQuestions={handleQuestions}
        onDemo={handleDemoRequest}
        facebookUrl={contact.facebookUrl}
      />
    </main>
  )
}

export default App
