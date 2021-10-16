import time, string, csv
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

filename = "mangoplate_review.csv"
f = open(filename, "w", encoding="utf8", newline="")
writer = csv.writer(f)
title = ["업소명", "날짜", "리뷰", "평점"]
writer.writerow(title)

driver = webdriver.Chrome("./chromedriver")
driver.get(
    "https://www.mangoplate.com/search/%EC%84%A0%EB%A6%89%EC%97%AD?keyword=%EC%84%A0%EB%A6%89%EC%97%AD&page=1"
)
driver.refresh()

# divs_one = soup.select("div.thumb")
# divs_two = soup.select("div.thumb")
# for i in range(len(divs_one)):
soup = BeautifulSoup(driver.page_source, "lxml")
lis = soup.select("li.list-restaurant.server_render_search_result_item")

for x in range(10):
    driver.get(
        f"https://www.mangoplate.com/search/%EC%84%A0%EB%A6%89%EC%97%AD?keyword=%EC%84%A0%EB%A6%89%EC%97%AD&page={x+1}"
    )
    for z in range(len(lis)):
        for j in range(2):
            """ 식당 클릭 """
            time.sleep(1)
            print(z)
            driver.find_element_by_xpath(
                f"/html/body/main/article/div[2]/div/div/section/div[3]/ul/li[{z+1}]/div[{j+1}]/figure/a"
            ).click()

            more_button = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located(
                    (By.CLASS_NAME, "RestaurantReviewList__MoreReviewButton")
                )
            )
            soup2 = BeautifulSoup(driver.page_source, "lxml")
            total_review_num = int(
                soup2.select_one("span.RestaurantReviewList__AllCount").get_text()
            )
            page_downs = 0
            while page_downs < total_review_num // 5:
                time.sleep(1)
                """ 더보기 클릭"""
                driver.execute_script("arguments[0].click()", more_button)
                page_downs += 1

            soup3 = BeautifulSoup(driver.page_source, "lxml")
            name = soup3.select_one("h1.restaurant_name").get_text()
            review_lis = soup3.select(
                "li.RestaurantReviewItem.RestaurantReviewList__ReviewItem"
            )

            for i in range(len(review_lis)):
                date = (
                    review_lis[i]
                    .select_one("span.RestaurantReviewItem__ReviewDate")
                    .get_text()
                )

                context = review_lis[i].select_one("p.RestaurantReviewItem__ReviewText")
                if context:
                    context = context.get_text()
                else:
                    context = None

                rate = (
                    review_lis[i]
                    .select_one("span.RestaurantReviewItem__RatingText")
                    .get_text()
                )

                if rate == "맛있다":
                    rate = 5
                elif rate == "괜찮다":
                    rate = 3
                else:
                    rate = 1
                writer.writerow([name, date, context, rate])
            driver.back()

