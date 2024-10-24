import { build } from 'pino-pretty'

export default function pinoPrettyTransport(opts) {
	return build({
		...opts,
		colorize: true,
		messageFormat: '{req.method}:{req.host}{req.url} ({res.statusCode})'
	})
}
