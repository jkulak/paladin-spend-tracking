"""
This module imports data from Pocker Expense csv export file
and saves it into database.
"""
from datetime import datetime
import os
import re
import sys

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker

from csv_tools import import_csv
from csv_tools import prepare_csv_file
from models import Category
from models import Label
from models import Payee
from models import Transaction

CSV_DATA_DIR = "data"
CSV_DATA_FILE = "PocketExpense_data_20230907.csv"

load_dotenv()

DATABASE_URL = os.getenv("DB_URL")


def extract_date(date):
    """Extract date from string."""

    # Check and replace '00' with '12' when it's close to 'AM'
    date = re.sub(r"00:(\d{2} [APM]{2})", r"12:\1", date)

    return datetime.strptime(date, "%m/%d/%Y %I:%M %p")


def extract_value(value):
    """
    Extract value from string.
    """
    amount_str = (
        value.replace("zł", "").replace(",", ".").replace("\xa0", "").strip()
    )  # Replace non-breaking space with a regular space.
    value = float(amount_str)

    return value


def extract_labels(note):
    """
    Extract labels from note. A note might have several labels.
    Labels are hashtags in the note.
    """
    labels = []

    for word in note.split():
        if word.startswith("#"):
            labels.append(word[1:])

    return labels


def process_row(row, session):
    """Save data to the database"""

    transaction = {
        "date": extract_date(row["Date"]),
        "category": row["Category"],
        "payee": row["Payee"],
        "value": extract_value(row["Amount"]),
        "note": row["Note"],
        "labels": extract_labels(row["Note"]),
    }

    # Check if the payee exists or not
    payee = (
        session.query(Payee).filter(Payee.name == transaction["payee"]).first()
    )
    if not payee:
        payee = Payee(name=transaction["payee"])
        session.add(payee)
        session.commit()

    # Check if the category exists or not
    category = (session.query(Category)
        .filter(Category.name == transaction["category"])
        .first()
    )
    if not category:
        category = Category(name=transaction["category"])
        session.add(category)
        session.commit()

     # Create or check Labels
    labels = []
    for label_name in transaction["labels"]:
        label = session.query(Label).filter_by(name=label_name).first()
        if not label:
            label = Label(name=label_name)
            session.add(label)
            session.commit()
        labels.append(label)

    # Create Transaction
    transaction = Transaction(
        date=transaction["date"],
        value=transaction["value"],
        note=transaction["note"],
        category=category,
        payee=payee,
        labels=labels
    )
    session.add(transaction)
    session.commit()


def main():
    """Main function."""

    base_file_path = os.path.join(CSV_DATA_DIR, CSV_DATA_FILE)
    cleaned_file_path = os.path.join(CSV_DATA_DIR, f"cleaned_{CSV_DATA_FILE}")

    prepare_csv_file(base_file_path, cleaned_file_path)
    data = import_csv(cleaned_file_path)

    engine = create_engine(DATABASE_URL)
    session_local = sessionmaker(bind=engine)
    session = session_local()

    for row in data:
        process_row(row, session)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
