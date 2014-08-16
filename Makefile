NPM_BIN = ./node_modules/.bin

all: examples/templates.js

%.js: %.yate
	$(NPM_BIN)/yate --output $@ $<

clean:
	rm examples/templates.js

.PHONY: clean
