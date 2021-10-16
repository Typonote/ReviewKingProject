from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from bs4 import BeautifulSoup
import time

soup_list = list()
kakao_list = list()

with webdriver.Chrome(executable_path="./chromedriver") as driver:
    wait = WebDriverWait(driver, 10)
    driver.get("https://map.kakao.com")
    driver.find_element(By.ID, "dimmedLayer").click()
    driver.find_element(By.ID, "search.keyword.query").send_keys(
        "선릉역 음식점" + Keys.RETURN
    )
    time.sleep(1)
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(1)
    driver.find_element(By.ID, "info.search.place.more").click()
    time.sleep(1)
    for _ in range(7):
        for n in range(1, 6):
            try:
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
                time.sleep(1)
                driver.find_element(By.ID, f"info.search.page.no{n}").click()
                time.sleep(1)
                soup = BeautifulSoup(driver.page_source, "html.parser")
                soup_list.extend(soup.find_all("li", {"class": "PlaceItem"}))
                time.sleep(1)
            except Exception as e:
                print(e)

        driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
        driver.find_element(By.ID, "info.search.page.next").click()
        time.sleep(1)

for listcode in soup_list:
    tmp = BeautifulSoup(str(listcode), "html.parser")
    store = tmp.find("span", {"data-id": "screenOutName"}).get_text()
    category = tmp.find("span", {"data-id": "subcategory"}).get_text()
    total_rating = float(tmp.find("em", {"data-id": "scoreNum"}).get_text())
    count_rate = int(tmp.find("a", {"data-id": "numberofscore"}).get_text()[:-1])
    url = tmp.find("a", {"data-id": "moreview"})["href"]
    kakao_list.append([store, category, total_rating, count_rate, url])

with open("kakao_restaurant.py", "w") as output:
    output.write("kakao_list = ")
    output.write(str(kakao_list))
