"""
This module imports data from Pocker Expense csv export file
and saves it into database.
"""
import csv
from datetime import datetime
import os
import sys

from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker

CSV_DATA_FILE = "data/PocketExpense_data_20230907.csv"


def prepare_csv_file(file_path, output_path, header_line='"Date&Time"'):
    with open(file_path, 'r') as f:
        lines = f.readlines()

    # Find the header_line and get its index
    header_index = None
    for i, line in enumerate(lines):
        if line.startswith(header_line):
            header_index = i
            break

    # If header found, write header and following lines to output file
    if header_index is not None:
        with open(output_path, 'w') as f:
            f.writelines(lines[header_index:])

def extract_date(date):
    """
    Extract date from string.
    """
    return datetime.strptime(date, "%m/%d/%Y %I:%M %p")

def import_csv(file_path: str):
    """
    Import data from csv.
    """
    new_headers = ["Date","Account","Category","Payee","Amount","Cleared","Note"]

    with open(file_path, 'r', encoding='utf-8') as csv_file:
        next(csv_file) # skip header
        reader = csv.DictReader(csv_file, fieldnames=new_headers)

        for row in reader:
            dt = datetime.strptime(row["Date&Time"], "%m/%d/%Y %I:%M %p")

            # Convert the amount string to an integer value in cents.
            is_negative = row["Amount"].startswith("-")
            amount_str = row["Amount"].replace("zł", "").replace(",", ".").replace("\xa0", "").strip()  # Replace non-breaking space with a regular space.
            value = int(float(amount_str) * 100)

            # Apply negative sign if the original string was negative.
            if is_negative:
                value *= -1
            
            # Here, you'd ideally have logic to lookup or create associated Payee, Category objects.
            # For simplicity's sake, I'll just create a new Payee and Category each time.
            # In a real-world scenario, you'd avoid creating duplicate entries.
            payee = row["Payee"]
            category = row["Category"]  # You may need additional logic for fields like 'icon'.

            transaction = {

            }


            
            # transaction = Transaction(
            #     name=row["Note"],
            #     added=dt,
            #     value=value,
            #     payee_id=payee.id,
            #     category_id=category.id
            # )
            

def main():
    # Usage
    prepare_csv_file(CSV_DATA_FILE, CSV_DATA_FILE + "_cleaned.csv")
    # Call the function
    import_csv(CSV_DATA_FILE + "_cleaned.csv")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
