import * as fs from 'node:fs/promises'
import { expect, test, vi, describe, beforeAll } from 'vitest'
import request from 'supertest'

import server from '../server/server.js'
import { getFishingTrips } from '../server/lib.js'
import { render } from './test-utils.js'

vi.mock('node:fs/promises')

beforeAll(() => {
  vi.mocked(fs.readFile).mockResolvedValue(
    JSON.stringify({
      fishingTrips: [
        {
          id: 1,
          date: '2023-08-01',
          location: 'Spirits Bay',
          image:
            'https://img.freepik.com/free-vector/happy-kid-sitting-chair-fishing_1308-121424.jpg?w=2000',
          weather: 'overcast',
          fish: [
            {
              species: 'snapper',
              length: 40,
              bait: 'bonito',
            },
            {
              species: 'trevally',
              length: 44,
              bait: 'bonito',
            },
            {
              species: 'snapper',
              length: 31,
              bait: 'bonito',
            },
          ],
        },
      ],
    })
  )
})

describe('Get /', async () => {
  test('shows a list of fishing trips', async () => {
    const res = await request(server).get('/')
    const screen = render(res)

    // const fishingTripEntry = screen.getByDisplayValue(/Fishing trip 1/)
    const fishingTripImage = screen.getByAltText('Fishing trip ')
    expect(fishingTripEntry).toMatchInlineSnapshot()
  })
})
