import { PrismaClient } from '@prisma/client'

let prismaClient

function createPrismaClient() {
	if (!prismaClient) {
		prismaClient = new PrismaClient()
	}
	return prismaClient
}

export default createPrismaClient()
