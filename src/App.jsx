import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import UploadMemePlate from './pages/UploadMemeplate'
import BulkUploadMemeTemplates from './pages/BulkUploadMemeTemplates'
import Homepage from './pages/Homepage'
import MemeGallery from './pages/MemeGallery'
import AppLayout from './AppLayout'
import Anime from './features/anime/Anime'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, 
    children: [
      {
        path: "/pnb",
        element: <Anime />
      },
      {
        path: "/homepage",
        element: <Homepage />
      },
      {
        path: "/memegallery",
        element: <MemeGallery />
      },
      {
        path: "/upload",
        element: <UploadMemePlate />
      },
      {
        path: "/bulkupload",
        element: <BulkUploadMemeTemplates />
      },
    ]
  },

]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
