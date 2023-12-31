"""Change value data type

Revision ID: 6311adae963a
Revises: 7a36eecc51b1
Create Date: 2023-09-07 00:50:24.870433

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6311adae963a'
down_revision: Union[str, None] = '7a36eecc51b1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('transactions', 'value',
               existing_type=sa.INTEGER(),
               type_=sa.Numeric(precision=10, scale=2),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('transactions', 'value',
               existing_type=sa.Numeric(precision=10, scale=2),
               type_=sa.INTEGER(),
               existing_nullable=True)
    # ### end Alembic commands ###
