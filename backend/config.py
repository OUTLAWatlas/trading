import os
class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'defaultsecret')
    TELEGRAM_TOKEN = os.getenv('TELEGRAM_TOKEN')
    TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')
    DATABASE = os.getenv('DATABASE', 'journal.db')
