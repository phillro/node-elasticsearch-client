DOCS = docs/*.md
REPORTER ?=spec

test:
		@NODE_ENV=test ./node_modules/.bin/mocha  \
					--reporter $(REPORTER)

test-cov: lib-cov
		@ELASTICSEARCHCLIENT_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html
		@rm -rf ./lib-cov

lib-cov:
		@jscoverage lib $@

.PHONY: test test-cov

