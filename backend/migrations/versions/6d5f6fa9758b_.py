"""empty message

Revision ID: 6d5f6fa9758b
Revises: 3e32808856dc
Create Date: 2021-10-03 23:21:39.491682

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6d5f6fa9758b'
down_revision = '3e32808856dc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('analysis', sa.Column('file_path', sa.String(length=200), nullable=True))
    op.drop_column('analysis', 'filename')
    op.add_column('menus', sa.Column('img_url', sa.String(length=200), nullable=True))
    op.drop_column('menus', 'img_path')
    op.drop_column('restaurants', 'res_type')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('restaurants', sa.Column('res_type', mysql.VARCHAR(length=50), nullable=True))
    op.add_column('menus', sa.Column('img_path', mysql.VARCHAR(length=200), nullable=True))
    op.drop_column('menus', 'img_url')
    op.add_column('analysis', sa.Column('filename', mysql.VARCHAR(length=200), nullable=True))
    op.drop_column('analysis', 'file_path')
    # ### end Alembic commands ###
