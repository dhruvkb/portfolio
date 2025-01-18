import type { APIRoute } from 'astro'

import type { Epic } from '@/models/recivi'
import { epics } from '@/stores/recivi'
import { getOgImage } from '@/utils/og_image'

interface Props {
  epic: Epic
}

export async function getStaticPaths() {
  return epics.map((epic) => ({
    params: { id: epic.id },
    props: { epic },
  }))
}

export const GET: APIRoute<Props> = async function ({ props: { epic } }) {
  let description = `Know about my work on ${epic.name}.`
  if (epic.description) {
    description = `${description} ${epic.description}`
  } else if (epic.summary) {
    description = `${description} ${epic.summary}`
  }
  return getOgImage({
    left: 'Résumé',
    right: 'Epic',
    title: epic.name,
    description,
    icon: epic.id,
  })
}
