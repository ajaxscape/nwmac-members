import 'dotenv/config'
import prisma from '../../repositories/utils/prisma-client.js'
import logger from '../../logger/logger.js'

async function main() {
  logger.info(`Start seeding ...`)

  logger.info('')

  logger.info(`Finished seeding`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    logger.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
