#!/usr/bin/env python

import simplejson as json

from sunlight import openstates

def main():

    events = openstates.events(state='mn')
    print json.dumps(events, indent = ' ' * 4)

if __name__ == '__main__':
    main()

