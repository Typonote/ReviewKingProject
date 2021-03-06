"""empty message

Revision ID: 9c00f0120c37
Revises: 6d5f6fa9758b
Create Date: 2021-10-05 11:02:43.966340

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '9c00f0120c37'
down_revision = '6d5f6fa9758b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('restaurants', 'integrated_rating')
    op.add_column('total_rating', sa.Column('integrated_rating', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('total_rating', 'integrated_rating')
    op.add_column('restaurants', sa.Column('integrated_rating', mysql.FLOAT(), nullable=True))
    # ### end Alembic commands ###
