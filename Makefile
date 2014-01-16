GENERATED_FILES = \
	public/events.json

LIBRARY_FILES = \
	public/lib/underscore-min.js \
	public/lib/jquery-1.10.2.min.js \
	public/lib/moment.min.js \

all: $(GENERATED_FILES) $(LIBRARY_FILES)

clean:
	rm -rf build
	rm -rf $(GENERATED_FILES) $(LIBRARY_FILES)

public/lib/underscore-min.js:
	curl http://underscorejs.org/underscore-min.js -o $@

public/lib/jquery-1.10.2.min.js:
	curl http://code.jquery.com/jquery-1.10.2.min.js -o $@

public/lib/moment.min.js:
	curl http://momentjs.com/downloads/moment.min.js -o $@

public/events.json: scripts/events.py
	./scripts/events.py > public/events.json

