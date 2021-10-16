import time, re, csv
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

filename = "네이버 업소명 총 평점 업종 url.csv"
f = open(filename, "w", encoding="utf8", newline="")
writer = csv.writer(f)
title = ["업소명", "총평점", "업종", "url"]
writer.writerow(title)

driver = webdriver.Chrome("./chromedriver")
driver.get(
    "https://map.naver.com/v5/search/%EC%84%A0%EB%A6%89%EC%97%AD%20%EC%9D%8C%EC%8B%9D%EC%A0%90/"
)

driver.switch_to.frame("searchIframe")
body = driver.find_element_by_tag_name("body")

for i in range(6):

    pagedowns = 1

    time.sleep(1)

    driver.find_element_by_xpath(
        '//*[@id="_pcmap_list_scroll_container"]/ul/li[1]/div[1]/a[1]'
    ).click()

    # 스크롤 안내려감
    while pagedowns < 30:
        body.send_keys(Keys.SPACE)
        time.sleep(0.1)
        pagedowns += 1

    html = driver.page_source
    soup = BeautifulSoup(html, "lxml")
    lis = soup.find_all("li", attrs={"class": re.compile("^_3t81n _1l5Ut")})

    for i in range(len(lis)):

        time.sleep(1.5)

        driver.find_element_by_xpath(
            f'//*[@id="_pcmap_list_scroll_container"]/ul/li[{i+1}]/div[1]/a[1]'
        ).click()

        time.sleep(1)

        name = lis[i].find("span", attrs={"class": "_3Yilt"}).get_text()
        em = lis[i].find("em")
        if em:
            em = em.get_text()
        else:
            rate = "평점 없음"

        driver.switch_to.parent_frame()
        driver.switch_to.frame("entryIframe")

        html2 = driver.page_source
        soup2 = BeautifulSoup(html2, "lxml")
        menu = soup2.find("span", attrs={"class": "_3ocDE"}).get_text()

        # print(name, em, menu, driver.current_url)
        url = (
            str(driver.current_url)
            .lstrip(
                "https://map.naver.com/v5/search/%EC%84%A0%EB%A6%89%EC%97%AD%20%EC%9D%8C%EC%8B%9D%EC%A0%90/place/"
            )
            .split("?")[0]
        )
        writer.writerow([name, menu, em, url])

        driver.switch_to.parent_frame()
        driver.switch_to.frame("searchIframe")

    driver.find_element_by_xpath('//*[@id="app-root"]/div/div[2]/div[2]/a[7]').click()


# element = WebDriverWait(driver, 10).until(
#     EC.element_to_be_clickable((By.XPATH, '//*[@id="app-root"]/div/div[2]/div[2]/a[7]'))
# )
# element.click()


# 클릭
# for elem in driver.find_elements_by_class_name("_3t81n _1l5Ut"):
#     time.sleep(1)
#     print(elem)
#     elem.click()
# driver.find_elements_by_class_name('_3t81n _1l5Ut')[i].click()

# url 뽑아오기
# print(driver.current_url())
