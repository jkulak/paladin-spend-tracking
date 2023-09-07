"""Add transactions_view_materialized

Revision ID: 05d9385c49d2
Revises: 274f4d07ff31
Create Date: 2023-09-07 16:18:26.553901

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '05d9385c49d2'
down_revision: Union[str, None] = '274f4d07ff31'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.execute("""
        CREATE MATERIALIZED VIEW transactions_view_materialized AS
        SELECT
          t.id,
            t.date,
            p.name AS payee_name,
            t.value,
            c.name AS category_name,
            STRING_AGG(l.name, ', ') AS labels,
            t.note
        FROM
            transactions t
        JOIN
            payee p ON t.payee_id = p.id
        JOIN
            category c ON t.category_id = c.id
        LEFT JOIN
            transaction_labels tl ON t.id = tl.transaction_id
        LEFT JOIN
            label l ON tl.label_id = l.id
        GROUP BY
            t.id, p.name, c.name;
    """)


def downgrade():
    op.execute("DROP MATERIALIZED VIEW transactions_view_materialized")
