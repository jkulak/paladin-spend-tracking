"""Add date to Transactions

Revision ID: 7a36eecc51b1
Revises: 5cf174ce3d95
Create Date: 2023-09-07 00:04:04.138835

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7a36eecc51b1'
down_revision: Union[str, None] = '5cf174ce3d95'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('transactions', sa.Column('date', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('transactions', 'date')
    # ### end Alembic commands ###
