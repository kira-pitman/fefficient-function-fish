import * as fs from 'node:fs/promises'
import { expect, test, vi, describe, beforeAll, beforeEach } from 'vitest'
import request from 'supertest'

import server from '../server/server.js'
import { render } from './test-utils.js'

vi.mock('node:fs/promises')

const fishingTripData = {
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
    {
      id: 2,
      date: '2023-08-03',
      location: 'idk man',
      image:
        'https://img.freepik.com/free-vector/happy-kid-sitting-chair-fishing_1308-121424.jpg?w=2000',
      weather: 'clear',
      fish: [
        {
          species: 'snapper',
          length: 40,
          bait: 'bonito',
        },
        {
          species: 'trevally',
          length: 50,
          bait: 'bonito',
        },
        {
          species: 'snapper',
          length: 31,
          bait: 'bonito',
        },
        {
          species: 'snapper',
          length: 33,
          bait: 'bonito',
        },
      ],
    },
  ],
}

beforeAll(() => {
  vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(fishingTripData))
})

describe('Get /', async () => {
  let res
  let screen

  beforeEach(async () => {
    res = await request(server).get('/')
    screen = render(res)
  })

  test('shows images of fishing trips', async () => {
    const fishingTripImage1 = screen.getByAltText('Fishing trip 1')
    const fishingTripImage2 = screen.getByAltText('Fishing trip 2')
    expect(fishingTripImage1.src).toBe(
      'https://img.freepik.com/free-vector/happy-kid-sitting-chair-fishing_1308-121424.jpg?w=2000'
    )
    expect(fishingTripImage2.src).toBe(
      'https://img.freepik.com/free-vector/happy-kid-sitting-chair-fishing_1308-121424.jpg?w=2000'
    )
  })

  test('shows all fishing trip dates', async () => {
    const date1 = screen.getByText('Date: 2023-08-01')
    const date2 = screen.getByText('Date: 2023-08-03')
    expect(date1.textContent).toBe('Date: 2023-08-01')
    expect(date2.textContent).toBe('Date: 2023-08-03')
  })
  test('displays number of fish caught', async () => {
    const numberOfFish1 = screen.getByText('Number of fish: 3')
    const numberOfFish2 = screen.getByText('Number of fish: 4')
    expect(numberOfFish1.textContent).toBe('Number of fish: 3')
    expect(numberOfFish2.textContent).toBe('Number of fish: 4')
  })
  test('links to correct fishing trip pages', async () => {
    const link1 = screen.getByText('Fishing trip 1')
    const link2 = screen.getByText('Fishing trip 2')
    expect(link1.href).toBe('/fishing-trip/1')
    expect(link2.href).toBe('/fishing-trip/2')
  })
})
