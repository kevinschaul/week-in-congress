#!/usr/bin/env python

from sunlight import openstates

def main():

    detail = openstates.bill_detail(
        state='mn',
        session='upper',
        bill_id='SF 14'
    )

    senate = openstates.bills(
        state='mn',
        chamber='upper',
        search_window='term',
    )

    for bill in senate[:1]:
        print bill
        print bill.get('state')
        print bill.get('session')
        print bill.get('bill_id')
        detail = openstates.bill_detail(
            state=bill.get('state'),
            session=bill.get('session'),
            bill_id=bill.get('bill_id')
        )

        print detail


if __name__ == '__main__':
    main()

