import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: 'eli222ua',
  dataset: 'production',
  apiVersion: '2025-07-21',
  useCdn: false,
})
