RUN=docker run -e NODE_ENV=test --rm nodejs-docker-oom
test:
	${RUN} npm test
