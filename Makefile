RUN=docker run --rm nodejs-docker-oom
test:
	${RUN} npm test
