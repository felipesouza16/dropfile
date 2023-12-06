import type { Prisma, PostFile } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PostFileCreateArgs>({
  postFile: {
    one: { data: { url: 'String' } },
    two: { data: { url: 'String' } },
  },
})

export type StandardScenario = ScenarioData<PostFile, 'postFile'>
