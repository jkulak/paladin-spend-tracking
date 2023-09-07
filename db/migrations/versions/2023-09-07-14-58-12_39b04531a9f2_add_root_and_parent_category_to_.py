"""Add root and parent_category to categories

Revision ID: 39b04531a9f2
Revises: 6311adae963a
Create Date: 2023-09-07 14:58:12.911067

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '39b04531a9f2'
down_revision: Union[str, None] = '6311adae963a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('category', sa.Column('root', sa.Boolean(), nullable=True))
    op.add_column('category', sa.Column('parent_category_id', sa.SmallInteger(), nullable=True))
    op.create_foreign_key(None, 'category', 'category', ['parent_category_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'category', type_='foreignkey')
    op.drop_column('category', 'parent_category_id')
    op.drop_column('category', 'root')
    # ### end Alembic commands ###