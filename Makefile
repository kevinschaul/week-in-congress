WEEK_IN_CONGRESS_LOCATION = $(shell pwd)

GENERATED_FILES = \

LIBRARY_FILES = \
	public/lib/underscore-min.js \
	public/lib/jquery-1.10.2.min.js \
	public/lib/moment.min.js \
	public/lib/moment-timezone.min.js \

all: $(GENERATED_FILES) $(LIBRARY_FILES)

clean:
	rm -rf build
	rm -rf $(GENERATED_FILES) $(LIBRARY_FILES)

install:
	virtualenv venv
	. venv/bin/activate; pip install -r requirements.txt
	touch week-in-congress.log
	cp scripts/settings.example.py scripts/settings.py
	echo 'Please enter secrets into scripts/settings.py'

start:
	export WEEK_IN_CONGRESS_LOCATION=$(WEEK_IN_CONGRESS_LOCATION)
	echo 'export WEEK_IN_CONGRESS_LOCATION=$(WEEK_IN_CONGRESS_LOCATION)' > week-in-congress-cron
	echo '*/5 * * * * ubuntu $(WEEK_IN_CONGRESS_LOCATION)/venv/bin/python $(WEEK_IN_CONGRESS_LOCATION)/scripts/run.py >> 2>&1 >> $(WEEK_IN_CONGRESS_LOCATION)/week-in-congress.log\n' >> week-in-congress-cron
	cp week-in-congress-cron /etc/cron.d/

log:
	tail -f week-in-congress.log

public/lib/underscore-min.js:
	curl http://underscorejs.org/underscore-min.js -o $@

public/lib/jquery-1.10.2.min.js:
	curl http://code.jquery.com/jquery-1.10.2.min.js -o $@

public/lib/moment.min.js:
	curl http://momentjs.com/downloads/moment.min.js -o $@

public/lib/moment-timezone.min.js:
	curl http://momentjs.com/downloads/moment-timezone.min.js -o $@

