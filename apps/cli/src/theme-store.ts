import Conf from 'conf'

import type { InConfigSchemaAdd } from './schema/schema-in'

export const themeStore = new Conf<{
    'dach-themes': {
        themes?: InConfigSchemaAdd[]
    }
}>({
    projectName: 'dach-themes',
})
