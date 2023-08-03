import * as Path from 'node:path'
import fs from 'node:fs/promises'

export async function getFishingTrips() {
  try {
    const data = await fs.readFile(
      Path.resolve('server/data/data.json'),
      'utf-8'
    )
    return JSON.parse(data)
  } catch {
    console.error("Sorry we can't load your fishing diary today :(")
  }
}

// async function of get details