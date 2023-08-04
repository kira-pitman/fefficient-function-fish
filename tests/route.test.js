import * as fs from 'node:fs/promises'
import { expect, test, vi, describe, beforeAll, beforeEach } from 'vitest'
import request from 'supertest'

import server from '../server/server.js'
import { getFishingTrips } from '../server/lib.js'
import { render } from './test-utils.js'

vi.mock('node:fs/promises')

const fishingTripData = {
  id: 1,
  date: '2023-08-01',
  location: 'Spirits Bay',
  image:
    'https://img.freepik.com/free-vector/happy-kid-sitting-chair-fishing_1308-121424.jpg?w=2000',
  weather: 'overcast',
  vibes: 'meh',
  fish: [
    { species: 'snapper', length: 40, bait: 'bonito' },
    { species: 'trevally', length: 44, bait: 'bonito' },
    { species: 'snapper', length: 31, bait: 'bonito' },
  ],
}

beforeAll(() => {
  vi.mocked(fs.readFile).mockResolvedValue(
    JSON.stringify({ fishingTrips: [fishingTripData] })
  )
})

describe('Get /fishing-trip/1', async () => {
  let res
  let screen

  beforeEach(async () => {
    res = await request(server).get('/fishing-trip/1')
    screen = render(res)
  })

  test('shows fishing trip image', async () => {
    const fishingTripImage = screen.getByAltText('Fishing trip 1')
    const expectedImageSource =
      'https://img.freepik.com/free-vector/happy-kid-sitting-chair-fishing_1308-121424.jpg?w=2000'
    expect(fishingTripImage.src).toBe(expectedImageSource)
  })
  test('shows a list of all fish', async () => {
    const fishList = screen.getByRole('list', { description: 'Fish:' })
    const fish = fishList.children
    expect(fishList).toBeTruthy()
    expect(fish.length).toBe(3)
  })
  test('shows date', async () => {
    const date = screen.getByText(/Date:/)
    expect(date.textContent).toBe('Date: 2023-08-01')
  })
  test('shows location', async () => {
    const location = screen.getByText(/Location:/)
    expect(location.textContent).toBe('Location: Spirits Bay')
  })
  test('shows vibes', async () => {
    const vibes = screen.getByText(/Vibes:/)
    expect(vibes.textContent).toBe('Vibes: meh')
  })
})
