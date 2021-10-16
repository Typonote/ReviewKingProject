from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from bs4 import BeautifulSoup
import time

# from selenium.webdriver.support.expected_conditions import presence_of_element_located
ss_review_list = list()
e_list = list()
# This example requires Selenium WebDriver 3.13 or newer
driver = webdriver.Chrome(executable_path="./chromedriver")
wait = WebDriverWait(driver, 10)

driver.get("https://www.siksinhot.com/search?keywords=%EC%84%A0%EB%A6%89%EC%97%AD")
time.sleep(2)

try:
    xpath = '//*[@id="schMove4"]/div/a'
    cnt = 0
    while driver.find_element(By.XPATH, xpath):
        more_button = driver.find_element(By.XPATH, xpath)
        driver.execute_script("arguments[0].click()", more_button)
        time.sleep(0.5)
except Exception:
    pass

soup = BeautifulSoup(driver.page_source, "html.parser")
with open("restaurant_reviews.html", "w") as output:
    output.write(soup)
time.sleep(1234)
# if soup.find("div", {"class": "rList"}):
#     for li in soup.find("div", {"class": "rList"}).select(
#         "li > div > div.cnt > div.score_story"
#     ):
#         rating = str(li.find_all("span"))
#         comment = str(li.find("p")).split(">", 1)[1].replace("</p>", "")
#         ss_review_list.append([name, rating, comment])
# else:
#     pass

# with open("restaurant_review_raw.py", "w") as output:
#     output.write("ss_review_list = ")
#     output.write(str(ss_review_list))
