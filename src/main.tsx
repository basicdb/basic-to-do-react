import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './global.css'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TaskProvider } from "@/contexts/TaskContext"
import Home from './App'

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <SidebarProvider>
          <div className="flex flex-row w-full">
            <AppSidebar />
            <div className="flex flex-col w-full">
              <SidebarTrigger className="text-[#9ba3af] sticky top-0 z-50" />
              <Home />
            </div>
          </div>
        </SidebarProvider>
      </TaskProvider>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
