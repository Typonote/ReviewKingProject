from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from bs4 import BeautifulSoup
import time
from kakao_restaurant import kakao_list

kakao_menu_list = list()
e_list = list()

driver = webdriver.Chrome(executable_path="./chromedriver")
wait = WebDriverWait(driver, 10)
for store, _, _, cnt, url in kakao_list:
    driver.get(f"{url}")
    time.sleep(2)

    soup = BeautifulSoup(driver.page_source, "html.parser")
    for menu in soup.select("ul.list_menu>li"):
        menu = menu.find("span", {"class": "loss_word"}).get_text()
        kakao_menu_list.append(["kakao", store, menu])

    with open("kakao_restaurant_menu.py", "w") as output:
        output.write("kakao_menu_list = ")
        output.write(str(kakao_menu_list))
