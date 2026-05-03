import { Routes, Route } from 'react-router-dom'
import SiteShell from './components/SiteShell'
import Home from './pages/Home'
import WhatsBroken from './pages/WhatsBroken'
import Strategy from './pages/Strategy'
import Summary from './pages/Summary'
import Competitive from './pages/Competitive'
import DesignSystem from './pages/DesignSystem'
import AuthoringConcepts from './pages/AuthoringConcepts'
import FlowsIndex from './pages/FlowsIndex'
import MayaCroMonday from './flows/MayaCroMonday'
import JordanCuration from './flows/JordanCuration'
import SamMobile from './flows/SamMobile'

export default function App() {
  return (
    <SiteShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whats-broken" element={<WhatsBroken />} />
        <Route path="/strategy" element={<Strategy />} />
        <Route path="/flows" element={<FlowsIndex />} />
        <Route path="/flows/maya" element={<MayaCroMonday />} />
        <Route path="/flows/jordan" element={<JordanCuration />} />
        <Route path="/flows/sam" element={<SamMobile />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/competitive" element={<Competitive />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/authoring" element={<AuthoringConcepts />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </SiteShell>
  )
}
