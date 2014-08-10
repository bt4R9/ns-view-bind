NPM_BIN = ./node_modules/.bin

all: examples/templates.js

examples/templates.js: examples/templates.yate
	$(NPM_BIN)/yate --output $@ $<

clean:
	rm examples/templates.js

.PHONY: clean
