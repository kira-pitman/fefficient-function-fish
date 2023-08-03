import * as fs from 'node:fs/promises'
import { expect, test, vi, describe, beforeAll } from 'vitest'
import request from 'supertest'

import server from '../server/server.js'
import { getFishingTrips } from '../server/lib.js'
import { render } from './test-utils.js'

describe('Get /fishing-trip/1', async () => {
  test('shows fishing trip image', async () => {
    const res = await request(server).get('/fishing-trip/1')
    const screen = render(res)

    const fishingTripImage = screen.getByAltText('Fishing trip 1')
    expect(fishingTripImage).toMatchInlineSnapshot(`
      <img
        alt="Fishing trip 1"
        class="fishingTripImage"
        src="https://img.freepik.com/free-vector/happy-kid-sitting-chair-fishing_1308-121424.jpg?w=2000"
      />
    `)
  })
  test('shows a list of all fish', async () => {
    const res = await request(server).get('/fishing-trip/1')
    const screen = render(res)

    const fish = screen.queryByRole('fishList')
    expect(fish).toMatchInlineSnapshot(`
      <ul
        role="fishList"
      >
        
          
        <li
          role="fishListli"
        >
          
              
          <div>
            Species: snapper
          </div>
          
              
          <div>
            Length: 40
          </div>
          
              
          <div>
            Bait: mullet
          </div>
          
            
        </li>
        
          
        <li
          role="fishListli"
        >
          
              
          <div>
            Species: snapper
          </div>
          
              
          <div>
            Length: 44
          </div>
          
              
          <div>
            Bait: mullet
          </div>
          
            
        </li>
        
          
        <li
          role="fishListli"
        >
          
              
          <div>
            Species: snapper
          </div>
          
              
          <div>
            Length: 50
          </div>
          
              
          <div>
            Bait: mullet
          </div>
          
            
        </li>
        
          
        <li
          role="fishListli"
        >
          
              
          <div>
            Species: kahawai
          </div>
          
              
          <div>
            Length: 60
          </div>
          
              
          <div>
            Bait: mullet
          </div>
          
            
        </li>
        
          
        <li
          role="fishListli"
        >
          
              
          <div>
            Species: kahawai
          </div>
          
              
          <div>
            Length: 50
          </div>
          
              
          <div>
            Bait: mullet
          </div>
          
            
        </li>
        
        
      </ul>
    `)
  })
  test('shows date', async () => {
    const res = await request(server).get('/fishing-trip/1')
    const screen = render(res)

    const date = screen.getByText(/Date:/)
    expect(date).toMatchInlineSnapshot(`
      <div>
        Date: 2023-08-03
      </div>
    `)
  })
  test('shows location', async () => {
    const res = await request(server).get('/fishing-trip/1')
    const screen = render(res)

    const location = screen.getByText(/Location:/)
    expect(location).toMatchInlineSnapshot(`
      <div>
        Location: Black Rocks
      </div>
    `)
  })
  test('shows location', async () => {
    const res = await request(server).get('/fishing-trip/1')
    const screen = render(res)

    const vibes = screen.getByText(/Vibes:/)
    expect(vibes).toMatchInlineSnapshot(`
      <div>
        Vibes: top notch
      </div>
    `)
  })
})
