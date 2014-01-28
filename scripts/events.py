#!/usr/bin/env python

import os

import simplejson as json

from sunlight import openstates

def main():
    events = openstates.events(state='mn')
    filename = os.path.join(
        os.environ['WEEK_IN_CONGRESS_LOCATION'],
        'data',
        'workspace',
        'events.json'
    )
    with open(filename, 'w') as f:
        f.write(json.dumps(events, indent = 4 * ' '))

if __name__ == '__main__':
    main()

