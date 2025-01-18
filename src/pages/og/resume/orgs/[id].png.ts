import type { APIRoute } from 'astro'

import type { Org } from '@/models/recivi'
import { orgs } from '@/stores/recivi'
import { getOgImage } from '@/utils/og_image'

interface Props {
  org: Org
}

export async function getStaticPaths() {
  return orgs.map((org) => ({
    params: { id: org.id },
    props: { org },
  }))
}

export const GET: APIRoute<Props> = async function ({ props: { org } }) {
  const description = `Know about my work at ${org.name}. ${
    org.description ?? org.summary
  }`
  return getOgImage({
    left: 'Résumé',
    right: 'Org',
    title: org.name,
    description,
    icon: org.id,
  })
}
