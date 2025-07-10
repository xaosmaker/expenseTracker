import { RouterProvider } from "react-router-dom"
import { router } from "./router/baseRoutes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

function App() {

  const queryClient = new QueryClient()

  return (

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )


}

export default App
