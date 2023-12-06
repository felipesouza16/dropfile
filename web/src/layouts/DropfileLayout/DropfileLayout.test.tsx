import { render } from '@redwoodjs/testing/web'

import DropfileLayout from './DropfileLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DropfileLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DropfileLayout />)
    }).not.toThrow()
  })
})
