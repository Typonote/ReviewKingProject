import time, re, csv
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

filename = "네이버 리뷰.csv"
f = open(filename, "w", encoding="utf8", newline="")
writer = csv.writer(f)
title = ["업소명", "날짜", "리뷰", "평점"]
writer.writerow(title)

driver = webdriver.Chrome("./chromedriver")
driver.get(
    "https://map.naver.com/v5/search/%EC%84%A0%EB%A6%89%EC%97%AD%20%EC%9D%8C%EC%8B%9D%EC%A0%90"
)

driver.switch_to.frame("searchIframe")
body = driver.find_element_by_tag_name("body")

for i in range(6):
    pagedowns = 1
    time.sleep(1)

    driver.find_element_by_xpath(
        '//*[@id="_pcmap_list_scroll_container"]/ul/li[1]/div[1]/a[1]'
    ).click()

    while pagedowns < 30:
        body.send_keys(Keys.SPACE)
        time.sleep(0.1)
        pagedowns += 1

    html = driver.page_source
    soup = BeautifulSoup(html, "lxml")
    lis = soup.find_all("li", attrs={"class": re.compile("^_3t81n _1l5Ut")})

    for i in range(len(lis)):
        driver.find_element_by_xpath(
            f'//*[@id="_pcmap_list_scroll_container"]/ul/li[{i+1}]/div[1]/a[1]'
        ).click()

        time.sleep(2)

        driver.switch_to.parent_frame()
        driver.switch_to.frame("entryIframe")

        """ 방문자 리뷰 클릭"""
        driver.find_element_by_xpath(
            '//*[@id="app-root"]/div/div/div[2]/div[1]/div/div/div[1]/div/span[2]/a'
        ).click()

        last_height = driver.execute_script("return document.body.scrollHeight")

        while True:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

            time.sleep(1)

            new_height = driver.execute_script("return document.body.scrollHeight")

            if new_height == last_height:
                try:
                    driver.find_element_by_xpath(
                        '//*[@id="app-root"]/div/div/div[2]/div[5]/div[4]/div[5]/div[2]/a'
                    ).click()
                except:
                    break

            last_height = new_height

        """ 리뷰 가져오기"""
        html2 = driver.page_source
        soup2 = BeautifulSoup(html2, "lxml")

        name = soup2.find("span", attrs={"class": "_3XamX"}).get_text()

        reviews = soup2.find_all("li", attrs={"class": "_2Cv-r"})

        for i in range(len(reviews)):
            date = (
                reviews[i]
                .find("div", attrs={"class": "ZvQ8X"})
                .find_all("span", attrs={"class": "_3WqoL"})[0]
                .get_text()
            )

            context = reviews[i].find("span", attrs={"class": "WoYOw"})
            if context:
                context = context.get_text()
            else:
                context = None

            rate = reviews[i].find("span", attrs={"class": "_2tObC"}).get_text()

            writer.writerow([name, date, context, rate])

        driver.switch_to.parent_frame()
        driver.switch_to.frame("searchIframe")

    driver.find_element_by_xpath('//*[@id="app-root"]/div/div[2]/div[2]/a[7]').click()
