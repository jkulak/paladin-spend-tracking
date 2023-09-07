import csv

NEW_HEADERS = [
    "Date",
    "Account",
    "Category",
    "Payee",
    "Amount",
    "Cleared",
    "Note",
]


def prepare_csv_file(file_path, output_path, header_line='"Date&Time"'):
    """Prepare csv file for import."""

    with open(file_path, "r", encoding="UTF-8") as f:
        lines = f.readlines()

    # Find the header_line and get its index
    header_index = None
    for i, line in enumerate(lines):
        if line.startswith(header_line):
            header_index = i
            break

    # If header found, write header and following lines to output file
    if header_index is not None:
        with open(output_path, "w", encoding="utf-8") as f:
            f.writelines(lines[header_index:])


def import_csv(file_path: str):
    """Import data from csv and override headers with NEW_HEADERS."""

    with open(file_path, "r", encoding="utf-8") as csv_file:
        # Skip headers
        next(csv_file)
        return list(csv.DictReader(csv_file, fieldnames=NEW_HEADERS))
