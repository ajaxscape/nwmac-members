import { PrismaClient } from '@prisma/client'

let prismaClient
const log = [
  {
    emit: 'event',
    level: 'query'
  }
  // {
  //   emit: 'stdout',
  //   level: 'error'
  // },
  // {
  //   emit: 'stdout',
  //   level: 'info'
  // },
  // {
  //   emit: 'stdout',
  //   level: 'warn'
  // }
]

function createPrismaClient() {
  if (!prismaClient) {
    prismaClient = new PrismaClient({ log })
    prismaClient.$on('query', (e) => {
      console.log('Query: ' + e.query)
      console.log('Params: ' + e.params)
      console.log('Duration: ' + e.duration + 'ms')
    })
  }
  return prismaClient
}

export default createPrismaClient()
