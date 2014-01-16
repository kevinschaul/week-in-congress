GENERATED_FILES = \

LIBRARY_FILES = \
	public/lib/underscore-min.js \
	public/lib/jquery-1.10.2.min.js \

all: $(GENERATED_FILES) $(LIBRARY_FILES)

clean:
	rm -rf build
	rm -rf $(GENERATED_FILES) $(LIBRARY_FILES)

public/lib/underscore-min.js:
	curl http://underscorejs.org/underscore-min.js -o $@

public/lib/jquery-1.10.2.min.js:
	curl http://code.jquery.com/jquery-1.10.2.min.js -o $@

