import invariant from 'tiny-invariant'
import type { CreateRpcFn } from '@tanstack/server-functions-plugin'

function sanitizeBase(base: string) {
  return base.replace(/^\/|\/$/g, '')
}

export const createServerRpc: CreateRpcFn = (
  functionId,
  serverBase,
  splitImportFn,
) => {
  invariant(
    splitImportFn,
    '🚨splitImportFnis required for the server functions ssr runtime, but was not provided.',
  )

  const url = `/${sanitizeBase(serverBase)}/${functionId}`

  return Object.assign(splitImportFn, {
    url,
    functionId,
  })
}
