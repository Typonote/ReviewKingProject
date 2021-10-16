import time, string, csv
from bs4 import BeautifulSoup
from selenium import webdriver

filename = "mango_restaurant.csv"
f = open(filename, "w", encoding="utf8", newline="")
writer = csv.writer(f)
title = ["업소명", "총평점", "업종", "img"]
writer.writerow(title)

driver = webdriver.Chrome("./chromedriver")
driver.get(
    "https://www.mangoplate.com/search/%EC%84%A0%EB%A6%89%EC%97%AD?keyword=%EC%84%A0%EB%A6%89%EC%97%AD&page=1"
)
driver.refresh()


for i in range(10):
    driver.get(
        f"https://www.mangoplate.com/search/%EC%84%A0%EB%A6%89%EC%97%AD?keyword=%EC%84%A0%EB%A6%89%EC%97%AD&page={i+1}"
    )
    soup = BeautifulSoup(driver.page_source, "lxml")
    lis = soup.find_all(
        "li", attrs={"class": "list-restaurant server_render_search_result_item"}
    )
    time.sleep(1)

    for i in range(len(lis)):
        div = lis[i].find_all("div", attrs={"class": "list-restaurant-item"})
        """ 업소명"""
        title1 = (
            div[0]
            .find("h2", attrs={"class": "title"})
            .get_text()
            .replace("\n", "")
            .replace(string.whitespace, "")
            .replace("         ", "")
        )
        title2 = (
            div[1]
            .find("h2", attrs={"class": "title"})
            .get_text()
            .replace("\n", "")
            .replace(string.whitespace, "")
            .replace("         ", "")
        )
        """ 총 평점  """

        total_rate1 = div[0].find("strong", attrs={"class": "point search_point"})
        if total_rate1:
            total_rate1 = total_rate1.get_text()

        else:
            None

        total_rate2 = div[1].find("strong", attrs={"class": "point search_point"})
        if total_rate2:
            total_rate2 = total_rate2.get_text()
        else:
            None

        """ menu """
        menu1 = div[0].select_one("p.etc > span").get_text().replace(" ", "")
        menu2 = div[1].select_one("p.etc > span").get_text().replace(" ", "")

        """ photo """
        photo1 = div[0].select_one("div.thumb > img")["src"]
        photo2 = div[1].select_one("div.thumb > img")["src"]

        writer.writerow([title1, total_rate1, menu1, photo1])
        writer.writerow([title2, total_rate2, menu2, photo2])

