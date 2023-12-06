import { render } from '@redwoodjs/testing/web'

import Preview from './Preview'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Preview', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Preview />)
    }).not.toThrow()
  })
})
