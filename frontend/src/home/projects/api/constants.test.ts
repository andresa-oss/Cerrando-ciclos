import { describe, it, expect } from 'vitest'
import { PROJECT_KEYS } from './constants'

describe('PROJECT_KEYS', () => {
  it('should have the correct root key', () => {
    expect(PROJECT_KEYS.all).toEqual(['projects'])
  })

  it('should generate correct detail key', () => {
    expect(PROJECT_KEYS.detail('123')).toEqual(['projects', 'detail', '123'])
  })
})
