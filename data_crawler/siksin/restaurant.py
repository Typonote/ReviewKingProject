from bs4 import BeautifulSoup

f = open("./sikshin.html")
html_content = f.read()
soup = BeautifulSoup(html_content, "html.parser")
url_src = list()
for i in range(len(soup.find("ul", {"data-reactid": "107"}).select("li"))):
    try:
        name = soup.select("li")[i].select_one("div > a > div > div > strong")
        store_url = soup.select("li")[i].find("a")["href"]
        img = soup.select("li")[i].find("img")["src"]
        rating = (
            soup.select("li")[i].find("em", {"class", "score"}).get_text()
            if soup.select("li")[i].find("em", {"class", "score"})
            else "평가중"
        )
        url_src.append(
            [
                name.text.replace("\n", "").replace("  ", " "),
                f"https://www.siksinhot.com{store_url}",
                img,
                rating,
            ]
        )
    except TypeError:
        pass

with open("restaurant_url.py", "w") as output:
    output.write("sikshin_restaurant_url_src = ")
    output.write(str(url_src))
