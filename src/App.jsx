import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import BulkUploadMemeTemplates from './pages/BulkUploadMemeTemplates'
import Homepage from './pages/Homepage'
import MemeGallery from './pages/MemeGallery'
import AppLayout from './AppLayout'
import Anime from './features/anime/Anime'
import UploadMemePlate from './pages/UploadMemePlate'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, 
    children: [
      {
        index: true, // This sets the default route for this path
        element: <Navigate to="/homepage" />
      },
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
