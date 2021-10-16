import time, re
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

driver = webdriver.Chrome("./chromedriver")

driver.get(
    "https://map.naver.com/v5/search/%EC%84%A0%EB%A6%89%EC%97%AD%20%EC%9D%8C%EC%8B%9D%EC%A0%90/"
)

driver.switch_to.parent_frame()
driver.switch_to.frame("searchIframe")

last_height = driver.execute_script("return document.body.scrollHeight")

while True:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    time.sleep(1)

    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height
