import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './Routes/Routes';
import AuthProvider from './Provider/AuthProvider';
import {Toaster} from 'react-hot-toast'
import{QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient=new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster/>
    </AuthProvider>
  </React.StrictMode>,
)
