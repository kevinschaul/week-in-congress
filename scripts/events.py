#!/usr/bin/env python

import json

from sunlight import openstates

def main():

    events = openstates.events(state='mn')
    print json.dumps(events)

if __name__ == '__main__':
    main()

