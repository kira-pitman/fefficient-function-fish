import * as fs from 'node:fs/promises'
import { expect, test, vi, describe, beforeAll } from 'vitest'
import * as Path from 'node:path/posix'

import { getFishingTrips } from '../server/lib.js'

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
    })
  )
})

test('getFishingTrips loads json from the right file', async () => {
  const data = await getFishingTrips()

  expect(fs.readFile).toHaveBeenCalledWith(
    Path.resolve('server/data/data.json'),
    'utf-8'
  )
  expect(data).toMatchInlineSnapshot(`
    {
      "fishingTrips": [
        {
          "date": "2023-08-01",
          "fish": [
            {
              "bait": "bonito",
              "length": 40,
              "species": "snapper",
            },
            {
              "bait": "bonito",
              "length": 44,
              "species": "trevally",
            },
            {
              "bait": "bonito",
              "length": 31,
              "species": "snapper",
            },
          ],
          "id": 1,
          "image": "https://img.freepik.com/free-vector/happy-kid-sitting-chair-fishing_1308-121424.jpg?w=2000",
          "location": "Spirits Bay",
          "weather": "overcast",
        },
        {
          "date": "2023-08-03",
          "fish": [
            {
              "bait": "bonito",
              "length": 40,
              "species": "snapper",
            },
            {
              "bait": "bonito",
              "length": 50,
              "species": "trevally",
            },
            {
              "bait": "bonito",
              "length": 31,
              "species": "snapper",
            },
            {
              "bait": "bonito",
              "length": 33,
              "species": "snapper",
            },
          ],
          "id": 2,
          "image": "https://img.freepik.com/free-vector/happy-kid-sitting-chair-fishing_1308-121424.jpg?w=2000",
          "location": "idk man",
          "weather": "clear",
        },
      ],
    }
  `)
})

test('getFishingTrips returns all trips', async () => {
  const data = await getFishingTrips()
  expect(data.fishingTrips).toHaveLength(2)
})
