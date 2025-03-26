// import { getPayload } from 'payload'
// import config from '@payload-config'
export type HttpMethod =
  | 'get'
  | 'connect'
  | 'delete'
  | 'head'
  | 'options'
  | 'patch'
  | 'post'
  | 'put'
import { Endpoint } from 'payload'

export const testAPI: Endpoint = {
  path: '/test',
  method: 'get',
  handler: async () => {
    return Response.json({ message: 'IT works!' })
  },
}
