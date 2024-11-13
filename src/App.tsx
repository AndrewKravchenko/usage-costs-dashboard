import { Dashboard } from '@/pages/Dashboard/Dashboard.tsx'
import { Footer, Header } from '@/components'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        <Dashboard />
      </main>
      <Footer />
    </div>
  )
}

export default App
