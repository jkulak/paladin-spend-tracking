from datetime import datetime

from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Numeric
from sqlalchemy import SmallInteger
from sqlalchemy import String
from sqlalchemy import Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

# Many-to-many association table for transactions and labels
transaction_labels_association = Table(
    "transaction_labels",
    Base.metadata,
    Column("transaction_id", Integer, ForeignKey("transactions.id")),
    Column("label_id", Integer, ForeignKey("label.id")),
)

class CommonBaseMixin:
    added = Column(DateTime, default=datetime.utcnow)
    added_by = Column(String)  # If you have a User model, you might want to set a ForeignKey here.
    updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    updated_by = Column(String)  # Similar to added_by, ForeignKey might be more appropriate.
    active = Column(Boolean, default=True)


class Payee(Base, CommonBaseMixin):
    __tablename__ = "payee"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)



class Label(Base, CommonBaseMixin):
    __tablename__ = "label"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)

class Category(Base, CommonBaseMixin):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)
    icon = Column(Integer)
    root = Column(Boolean, default=True)
    parent_category_id = Column(SmallInteger, ForeignKey("category.id"), nullable=True, default=None)


class Transaction(Base, CommonBaseMixin):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)
    note = Column(String, index=True)
    date = Column(DateTime, default=datetime.utcnow)
    value = Column(
        Numeric(precision=10, scale=2)
    )  # for example, up to 10 digits in total with 2 after the decimal point
    payee_id = Column(Integer, ForeignKey("payee.id"))
    payee = relationship("Payee")
    category_id = Column(Integer, ForeignKey("category.id"))
    category = relationship("Category")
    labels = relationship("Label", secondary=transaction_labels_association)
