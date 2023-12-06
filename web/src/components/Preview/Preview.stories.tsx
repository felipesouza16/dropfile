// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import Preview from './Preview'

const meta: Meta<typeof Preview> = {
  component: Preview,
}

export default meta

type Story = StoryObj<typeof Preview>

export const Primary: Story = {}
