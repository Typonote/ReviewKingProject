from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from bs4 import BeautifulSoup
import time
from math import ceil
from kakao_restaurant import kakao_list

kakao_review_list = list()
e_list = list()

driver = webdriver.Chrome(executable_path="./chromedriver")
wait = WebDriverWait(driver, 10)
for store, _, _, cnt, url in kakao_list:
    driver.get(f"{url}#comment")
    time.sleep(2)
    for i in range(1, ceil(cnt / 5) + 1):
        comments = driver.find_elements(By.CLASS_NAME, "txt_comment")
        for c in comments:
            try:
                c.click()
            except Exception:
                pass

        soup = BeautifulSoup(driver.page_source, "html.parser")
        for review in soup.select("ul.list_evaluation>li"):
            rating = int(review.find("em", {"class": "num_rate"}).get_text()[:1])
            date = review.find("span", {"class": "time_write"}).get_text()
            if review.find("p", {"class": "txt_comment"}):
                comment = (
                    review.find("p", {"class": "txt_comment"}).find("span").get_text()
                )
            else:
                comment = "이 게시글은 정보통신망법 제 44조 2항에 의해 임시조치 되었습니다."
            kakao_review_list.append(["kakao", store, rating, date, comment])

        # 페이지 넘기기
        time.sleep(1)
        try:
            driver.find_elements_by_css_selector(".paging_mapdetail .link_page")
            xpath = f"//a[@data-page='{i+1}']"
            print(xpath)
            driver.find_element(By.XPATH, xpath).click()
        except Exception:
            pass

        time.sleep(1)

    with open("kakao_restaurant_review.py", "w") as output:
        output.write("kakao_review_list = ")
        output.write(str(kakao_review_list))
