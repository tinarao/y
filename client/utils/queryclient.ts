import { QueryClient } from "@tanstack/react-query"


const getQueryClient = () => {
  return new QueryClient()
}

declare global {
  var qcGlobal: undefined | ReturnType<typeof getQueryClient>
}

const queryClient = globalThis.QueryClient ?? getQueryClient()

export default queryClient

if (process.env.NODE_ENV !== 'production') globalThis.qcGlobal = queryClient