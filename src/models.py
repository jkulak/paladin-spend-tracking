from datetime import datetime

from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

# Many-to-many association table for transactions and labels
transaction_labels_association = Table('transaction_labels', Base.metadata,
    Column('transaction_id', Integer, ForeignKey('transactions.id')),
    Column('label_id', Integer, ForeignKey('label.id'))
)

class Payee(Base):
    __tablename__ = 'payee'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)
    added = Column(DateTime, default=datetime.utcnow)
    active = Column(Boolean, default=True)
    
class Label(Base):
    __tablename__ = 'label'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)
    added = Column(DateTime, default=datetime.utcnow)
    active = Column(Boolean, default=True)
    
class Category(Base):
    __tablename__ = 'category'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)
    added = Column(DateTime, default=datetime.utcnow)
    active = Column(Boolean, default=True)
    icon = Column(Integer)
    
class Transaction(Base):
    __tablename__ = 'transactions'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)
    added = Column(DateTime, default=datetime.utcnow)
    date = Column(DateTime, default=datetime.utcnow)
    active = Column(Boolean, default=True)
    value = Column(Integer)
    payee_id = Column(Integer, ForeignKey('payee.id'))
    payee = relationship("Payee")
    category_id = Column(Integer, ForeignKey('category.id'))
    category = relationship("Category")
    labels = relationship("Label", secondary=transaction_labels_association)
