#!/usr/bin/env python

import logging
import os
import time

from boto.s3.connection import S3Connection
from boto.s3.key import Key

import settings

def upload(local_filename, remote_filename):
    conn = S3Connection(settings.AWS_ACCESS_KEY, settings.AWS_SECRET_KEY)
    bucket = conn.create_bucket('startribune')

    k = Key(bucket)
    k.key = '2014-week-in-congress/' + remote_filename
    k.set_contents_from_filename(
        os.path.join(
            os.environ['WEEK_IN_CONGRESS_LOCATION'],
            'data',
            'workspace',
            local_filename
        )
    )
    k.set_acl('public-read')
    logging.info(remote_filename + ' uploaded to S3')

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
    upload(sys.argv[1])

