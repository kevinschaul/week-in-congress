#!/usr/bin/env python

import logging
import os
import sys

import events
import upload

def main():
    exitStatus = 0

    try:
        events.main()
        upload.upload(
            os.path.join(
                os.environ['WEEK_IN_CONGRESS_LOCATION'],
                'data',
                'workspace',
                'events.json'
            ),
            'events.json'
        )
        logging.info('Successfull uploaded events.json')
    except Exception as e:
        logging.error(e)
        exitStatus = 1

    sys.exit(exitStatus)

if __name__ == '__main__':
    logfile = os.path.join(
        os.environ['WEEK_IN_CONGRESS_LOCATION'],
        'week-in-congress.log'
    )
    logging.basicConfig(
        format='[%(filename)s:%(lineno)d %(asctime)s] %(levelname)s: %(message)s',
        level=logging.INFO,
        filename=logfile
    )
    main()

