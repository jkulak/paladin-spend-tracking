"""Move common fields

Revision ID: 30643169b049
Revises: 39b04531a9f2
Create Date: 2023-09-07 15:11:31.478878

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '30643169b049'
down_revision: Union[str, None] = '39b04531a9f2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('category', sa.Column('added_by', sa.String(), nullable=True))
    op.add_column('category', sa.Column('updated', sa.DateTime(), nullable=True))
    op.add_column('category', sa.Column('updated_by', sa.String(), nullable=True))
    op.add_column('label', sa.Column('added_by', sa.String(), nullable=True))
    op.add_column('label', sa.Column('updated', sa.DateTime(), nullable=True))
    op.add_column('label', sa.Column('updated_by', sa.String(), nullable=True))
    op.add_column('payee', sa.Column('added_by', sa.String(), nullable=True))
    op.add_column('payee', sa.Column('updated', sa.DateTime(), nullable=True))
    op.add_column('payee', sa.Column('updated_by', sa.String(), nullable=True))
    op.add_column('transactions', sa.Column('added_by', sa.String(), nullable=True))
    op.add_column('transactions', sa.Column('updated', sa.DateTime(), nullable=True))
    op.add_column('transactions', sa.Column('updated_by', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('transactions', 'updated_by')
    op.drop_column('transactions', 'updated')
    op.drop_column('transactions', 'added_by')
    op.drop_column('payee', 'updated_by')
    op.drop_column('payee', 'updated')
    op.drop_column('payee', 'added_by')
    op.drop_column('label', 'updated_by')
    op.drop_column('label', 'updated')
    op.drop_column('label', 'added_by')
    op.drop_column('category', 'updated_by')
    op.drop_column('category', 'updated')
    op.drop_column('category', 'added_by')
    # ### end Alembic commands ###